import "./App.css";

const sessions = [
  {
    title: "Session 9: Skill",
    topics: [
      "Async / Await and Promise Chains for UI Updates",
      "Closures as Memory / State Constructs"
    ],
    method: "Demonstration and Hands-on"
  },
  {
    title: "Session 10: Skill",
    topics: [
      "Implementing Promise and Memory Closure in Project",
      "Component as Deterministic UI Function (Props, State)",
      "React Hooks and Re-rendering",
      "Skeleton UIs",
      "Architectural Patterns (Container-Presenter, Smart-Dumb Components)"
    ],
    method: "Project Hands-on"
  },
  {
    title: "Session 11: Lab",
    topics: [
      "Error Boundaries at JS Level",
      "TypeScript Types / Interfaces / Generics for UI Correctness"
    ],
    method: "Demonstration and Hands-on"
  }
];

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Week 3 - Frontend Engineering</h1>
        <p>React, Async Patterns & UI Architecture</p>
      </header>

      <div className="container">
        {sessions.map((session, index) => (
          <div className="session-card" key={index}>
            <h2>{session.title}</h2>

            <ul>
              {session.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>

            <div className="method">
              Method: <span>{session.method}</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>Frontend Lab | Week 3 Dashboard</p>
      </footer>
    </div>
  );
}

export default App;