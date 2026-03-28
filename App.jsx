import React from "react";
import "./App.css";

const sections = [
  {
    title: "Problems Frameworks Solve",
    points: [
      "Manual DOM Manipulation",
      "State Synchronization Issues",
      "Poor Code Reusability",
      "Tight Coupling of UI Logic",
      "Inefficient Updates (Performance)",
      "Scaling UI for Large Applications",
      "Handling UI States (Loading, Error, Success)",
      "Cross-Platform UI Development",
    ],
  },
  {
    title: "How Frameworks Abstract Complexity",
    points: [
      "DOM Manipulation Abstraction",
      "Declarative UI",
      "State Management",
      "Componentization",
      "Lifecycle Handling (Hooks)",
      "Performance Optimization (Virtual DOM)",
      "State Sharing (Context, Redux)",
      "Tooling & Ecosystem (Vite, Testing)",
    ],
  },
  {
    title: "Key Concepts",
    points: [
      "DOM Limitations",
      "Virtual DOM",
      "Imperative vs Declarative",
      "Unidirectional Data Flow",
      "Component-Driven Thinking",
      "Rendering Pipeline",
    ],
  },
  {
    title: "React Rendering Pipeline",
    points: [
      "State Change",
      "Render Phase",
      "Virtual DOM Creation",
      "Diffing (Reconciliation)",
      "Commit Phase",
      "Minimal DOM Updates",
      "useEffect Execution",
    ],
  },
  {
    title: "Browser Rendering Pipeline",
    points: [
      "Style Calculation",
      "Layout (Reflow)",
      "Paint",
      "Composite (GPU)",
    ],
  },
];

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Frontend Engineering - Week 1</h1>
        <p>React & Modern UI Architecture</p>
      </header>

      <div className="grid">
        {sections.map((section, index) => (
          <div className="card" key={index}>
            <h2>{section.title}</h2>
            <ul>
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>Designed with ❤️ using React</p>
      </footer>
    </div>
  );
}