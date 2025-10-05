"use client";

import { useState, useEffect } from "react";
import { LoadingOverlay, Header, Sidebar, MainContent } from "./components";
import { content } from "./data";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
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
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      <Header />
      <div className="container">
        <Sidebar
          currentTopic={currentTopic}
          onTopicChange={handleTopicChange}
        />
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

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

// Translate to English
