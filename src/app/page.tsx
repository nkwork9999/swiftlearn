"use client";

import { useState, useEffect } from "react";
import { LoadingOverlay, Header, Sidebar, MainContent } from "./components";
import { content } from "./data";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({
    category: "basics" as const,
    topic: "hello" as const,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTopicChange = (category: string, topic: string) => {
    setCurrentTopic({ category: category as any, topic: topic as any });
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      <Header />

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="container">
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar
            currentTopic={currentTopic}
            onTopicChange={handleTopicChange}
          />
        </div>
        <MainContent
          data={content[currentTopic.category][currentTopic.topic]}
          currentTopic={currentTopic}
        />
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
            sans-serif;
          background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%);
          color: #e5e7eb;
          min-height: 100vh;
        }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 80px;
          left: 16px;
          z-index: 1000;
          background: rgba(31, 41, 55, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          padding: 12px;
          color: #e5e7eb;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 998;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          min-height: calc(100vh - 80px);
        }

        .sidebar-wrapper {
          transition: transform 0.3s ease;
        }

        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 280px 1fr;
            gap: 20px;
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .sidebar-overlay {
            display: block;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          .sidebar-overlay.active {
            opacity: 1;
            pointer-events: auto;
          }

          .container {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 16px;
            padding-top: 70px;
          }

          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 280px;
            transform: translateX(-100%);
            z-index: 999;
            background: #0f172a;
            overflow-y: auto;
            padding-top: 80px;
          }

          .sidebar-wrapper.open {
            transform: translateX(0);
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 12px;
            padding-top: 60px;
          }

          .sidebar-wrapper {
            width: 260px;
          }

          .mobile-menu-btn {
            top: 70px;
            left: 12px;
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
}
