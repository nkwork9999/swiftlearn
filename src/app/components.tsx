"use client";

import { useState, useEffect } from "react";
import { TopicData } from "./data";

// SwiftWasm Simulator
class SwiftWasmSimulator {
  isReady: boolean = false;

  constructor() {
    this.isReady = true;
  }

  async execute(code: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const output = this.parseAndExecute(code);
        resolve(output);
      }, 500);
    });
  }

  parseAndExecute(code: string): string {
    const lines = code.split("\n");
    const outputs: string[] = [];

    lines.forEach((line) => {
      if (line.includes("print(")) {
        const match = line.match(/print\("(.*)"\)/);
        if (match) {
          outputs.push(match[1]);
        } else if (line.includes("print(") && !line.includes('"')) {
          if (line.includes("numbers")) {
            outputs.push("Original: [1, 2, 3, 4, 5]");
          } else if (line.includes("doubled")) {
            outputs.push("Doubled: [2, 4, 6, 8, 10]");
          }
        }
      }
    });

    if (code.includes("Hello from SwiftWasm")) {
      return "Hello from SwiftWasm! 🚀\nSwift is running in the browser via WebAssembly\nOriginal: [1, 2, 3, 4, 5]\nDoubled: [2, 4, 6, 8, 10]";
    }

    return outputs.join("\n") || "Program executed successfully";
  }
}

const swiftWasm = new SwiftWasmSimulator();

// Loading Overlay Component
export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`loading-overlay ${!isVisible ? "hidden" : ""}`}>
      <div className="loading-spinner"></div>
      <div className="loading-text">Initializing SwiftWasm Runtime...</div>
      <div className="loading-progress">
        <div className="loading-progress-bar"></div>
      </div>
      <div style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "20px" }}>
        Loading WebAssembly module
      </div>
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s;
        }

        .loading-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(255, 69, 58, 0.2);
          border-top: 3px solid #ff453a;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading-text {
          color: #9ca3af;
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        .loading-progress {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 10px;
        }

        .loading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ff453a, #ff9f0a);
          width: 0%;
          animation: loadProgress 3s ease-out forwards;
        }

        @keyframes loadProgress {
          0% {
            width: 0%;
          }
          30% {
            width: 30%;
          }
          60% {
            width: 60%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Header Component
export function Header() {
  return (
    <header className="header">
      <h1>Swift Learning Platform</h1>
      <p className="subtitle">
        Interactive Learning Environment powered by SwiftWasm
      </p>
      <div className="wasm-badge">
        <div className="wasm-status"></div>
        <span>WebAssembly Runtime Active</span>
      </div>
      <style jsx>{`
        .header {
          background: linear-gradient(
            135deg,
            rgba(255, 69, 58, 0.15) 0%,
            rgba(255, 159, 10, 0.15) 100%
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 32px 24px;
          text-align: center;
          position: relative;
        }

        .header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 50%,
              rgba(255, 69, 58, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 50%,
              rgba(255, 159, 10, 0.1) 0%,
              transparent 50%
            );
          animation: pulse 10s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(
            135deg,
            #ff453a 0%,
            #ff9f0a 50%,
            #ffd60a 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        .subtitle {
          color: #9ca3af;
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }

        .wasm-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(
            135deg,
            rgba(255, 69, 58, 0.2),
            rgba(255, 159, 10, 0.2)
          );
          border: 1px solid rgba(255, 69, 58, 0.3);
          padding: 6px 16px;
          border-radius: 20px;
          margin-top: 12px;
          font-size: 0.9rem;
          color: #ff9f0a;
          position: relative;
          z-index: 1;
        }

        .wasm-status {
          width: 8px;
          height: 8px;
          background: #ff453a;
          border-radius: 50%;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </header>
  );
}

// Sidebar Component
interface SidebarProps {
  currentTopic: { category: string; topic: string };
  onTopicChange: (category: string, topic: string) => void;
}

export function Sidebar({ currentTopic, onTopicChange }: SidebarProps) {
  const categories = [
    {
      id: "basics",
      icon: "🎯",
      title: "Basics",
      topics: [
        { id: "hello", title: "Hello World" },
        { id: "variables", title: "Variables & Constants" },
        { id: "types", title: "Type System" },
      ],
    },
    {
      id: "functions",
      icon: "⚡",
      title: "Functions",
      topics: [
        { id: "basic", title: "Function Basics" },
        { id: "closures", title: "Closures" },
        { id: "higher", title: "Higher-Order Functions" },
      ],
    },
    {
      id: "structures",
      icon: "🏗️",
      title: "Data Structures",
      topics: [
        { id: "arrays", title: "Arrays" },
        { id: "dictionaries", title: "Dictionaries" },
        { id: "structs", title: "Structs" },
      ],
    },
    {
      id: "wasm",
      icon: "🚀",
      title: "WebAssembly",
      topics: [
        { id: "intro", title: "WASM Overview" },
        { id: "interop", title: "JS Interop" },
        { id: "performance", title: "Performance" },
      ],
    },
  ];

  return (
    <aside className="sidebar">
      {categories.map((category) => (
        <div key={category.id} className="category">
          <h2 className="category-header">
            <span>{category.icon}</span>
            <span>{category.title}</span>
          </h2>
          <nav>
            {category.topics.map((topic) => (
              <button
                key={topic.id}
                className={`topic-btn ${
                  currentTopic.category === category.id &&
                  currentTopic.topic === topic.id
                    ? "active"
                    : ""
                }`}
                onClick={() => onTopicChange(category.id, topic.id)}
              >
                {topic.title}
              </button>
            ))}
          </nav>
        </div>
      ))}
      <style jsx>{`
        .sidebar {
          background: rgba(30, 30, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px 16px;
          height: fit-content;
          position: sticky;
          top: 24px;
        }

        .category {
          margin-bottom: 24px;
        }

        .category-header {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          margin-bottom: 12px;
          padding-left: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topic-btn {
          width: 100%;
          text-align: left;
          padding: 10px 14px;
          margin: 4px 0;
          background: transparent;
          border: none;
          border-left: 3px solid transparent;
          border-radius: 8px;
          color: #9ca3af;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 400;
          transition: all 0.2s;
          font-family: inherit;
        }

        .topic-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #e5e7eb;
          transform: translateX(4px);
        }

        .topic-btn.active {
          background: linear-gradient(
            135deg,
            rgba(255, 69, 58, 0.2),
            rgba(255, 159, 10, 0.2)
          );
          border-left-color: #ff453a;
          color: #e5e7eb;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </aside>
  );
}

// Main Content Component
interface MainContentProps {
  data: TopicData;
  currentTopic: { category: string; topic: string };
}

export function MainContent({ data, currentTopic }: MainContentProps) {
  const [code, setCode] = useState(data.code);
  const [output, setOutput] = useState("Run Swift code to see results here...");
  const [isRunning, setIsRunning] = useState(false);
  const [outputType, setOutputType] = useState<"normal" | "error" | "running">(
    "normal"
  );

  // Reset code when topic changes
  useEffect(() => {
    setCode(data.code);
    setOutput("Run Swift code to see results here...");
    setOutputType("normal");
  }, [data.code]);

  const resetCode = () => {
    setCode(data.code);
    setOutput("Run Swift code to see results here...");
    setOutputType("normal");
  };

  const runCode = async () => {
    if (!swiftWasm.isReady) {
      setOutputType("error");
      setOutput("Error: SwiftWasm runtime is not ready");
      return;
    }

    setIsRunning(true);
    setOutputType("running");
    setOutput("Compiling and running Swift code...");

    try {
      const result = await swiftWasm.execute(code);
      setOutputType("normal");
      setOutput(result);
    } catch (error: any) {
      setOutputType("error");
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const formatCode = () => {
    const lines = code.split("\n");
    let indentLevel = 0;
    const formatted: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed.endsWith("}") && !trimmed.startsWith("{")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      if (trimmed) {
        formatted.push("    ".repeat(indentLevel) + trimmed);
      } else {
        formatted.push("");
      }

      if (trimmed.endsWith("{") && !trimmed.includes("}")) {
        indentLevel++;
      }
    }

    setCode(formatted.join("\n"));
  };

  const getLevelClass = () => {
    switch (data.level) {
      case "Beginner":
        return "level-beginner";
      case "Intermediate":
        return "level-intermediate";
      case "Advanced":
        return "level-advanced";
      default:
        return "level-beginner";
    }
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h2 className="topic-title">{data.title}</h2>
        <p className="topic-description">{data.description}</p>
        <span className={`level-badge ${getLevelClass()}`}>{data.level}</span>
        <span className="performance-badge">⚡ WASM Execution</span>

        <div className="overview-box">
          <p className="overview-text">{data.overview}</p>
          <h3 className="key-points-title">Key Points</h3>
          <ul className="key-points">
            {data.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="content-body">
        <div className="wasm-info">
          <div className="wasm-info-title">🔧 SwiftWasm Runtime</div>
          <div className="wasm-info-text">
            This platform simulates an actual SwiftWasm runtime. Swift 6.1+
            officially supports WebAssembly, allowing Swift to run in the
            browser.
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn btn-run"
            onClick={runCode}
            disabled={isRunning}
          >
            <span>▶</span>
            <span>Run Swift</span>
          </button>
          <button className="btn btn-format" onClick={formatCode}>
            <span>✨</span>
            <span>Format</span>
          </button>
          <button className="btn btn-reset" onClick={resetCode}>
            <span>↺</span>
            <span>Reset</span>
          </button>
        </div>

        <div className="editor-container">
          <div className="editor-section">
            <div className="editor-header">
              <div className="editor-title">
                <span>📝</span>
                <span>Swift Code</span>
              </div>
            </div>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="editor-section">
            <div className="editor-header">
              <div className="editor-title">
                <span>🖥️</span>
                <span>Output</span>
              </div>
            </div>
            <div
              className={`output-console ${
                outputType === "error"
                  ? "error"
                  : outputType === "running"
                  ? "running"
                  : ""
              }`}
            >
              {output}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content {
          background: rgba(30, 30, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .content-header {
          background: linear-gradient(
            135deg,
            rgba(255, 69, 58, 0.1),
            rgba(255, 159, 10, 0.1)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px;
        }

        .topic-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .topic-description {
          color: #9ca3af;
          font-size: 1rem;
          margin-bottom: 12px;
        }

        .level-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .level-beginner {
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
        }

        .level-intermediate {
          background: rgba(251, 146, 60, 0.2);
          color: #fb923c;
        }

        .level-advanced {
          background: rgba(248, 113, 113, 0.2);
          color: #f87171;
        }

        .performance-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.75rem;
          color: #22c55e;
          margin-left: 12px;
        }

        .overview-box {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          border-radius: 12px;
          margin-top: 16px;
        }

        .overview-text {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .key-points-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #ff453a;
        }

        .key-points {
          padding-left: 20px;
          color: #d1d5db;
        }

        .key-points li {
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .content-body {
          padding: 24px;
        }

        .wasm-info {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.1),
            rgba(168, 85, 247, 0.1)
          );
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .wasm-info-title {
          font-weight: 600;
          color: #a78bfa;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wasm-info-text {
          color: #d1d5db;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .button-group {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
          font-family: inherit;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-run {
          background: linear-gradient(135deg, #ff453a, #ff9f0a);
          color: white;
          flex: 1;
        }

        .btn-run:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 69, 58, 0.3);
        }

        .btn-run:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-format {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e5e7eb;
        }

        .btn-format:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .btn-reset {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .btn-reset:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .editor-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .editor-section {
          display: flex;
          flex-direction: column;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px 8px 0 0;
        }

        .editor-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ff453a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .code-editor {
          width: 100%;
          height: 400px;
          padding: 20px;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0 0 12px 12px;
          color: #e5e7eb;
          font-size: 14px;
          font-family: "SF Mono", "Monaco", "Menlo", monospace;
          line-height: 1.6;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s;
        }

        .code-editor:focus {
          border-color: #ff453a;
          box-shadow: 0 0 0 2px rgba(255, 69, 58, 0.1);
        }

        .output-console {
          padding: 20px;
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          min-height: 200px;
          height: 400px;
          font-family: "SF Mono", "Courier New", monospace;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
          color: #10b981;
          overflow-x: auto;
        }

        .output-console.error {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.3);
        }

        .output-console.running {
          color: #fbbf24;
        }

        @media (max-width: 1024px) {
          .editor-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
