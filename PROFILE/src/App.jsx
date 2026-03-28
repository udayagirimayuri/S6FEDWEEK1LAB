import React, { useState, useEffect } from "react";
import "./App.css";

// Child Component (Componentization + Unidirectional Data Flow)
function DataCard({ title, body }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

export default function App() {
  // State Management Abstraction
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading"); 
  // loading | success | error

  // Lifecycle Handling (useEffect → runs after commit phase)
  useEffect(() => {
    simulateFetch();
  }, []);

  // Simulated API call (to show state transitions)
  const simulateFetch = () => {
    setStatus("loading");

    setTimeout(() => {
      const success = true; // change to false to test error state

      if (success) {
        setData([
          { id: 1, title: "Component-Based UI", body: "Build reusable pieces." },
          { id: 2, title: "Declarative Approach", body: "Describe WHAT, not HOW." },
          { id: 3, title: "Virtual DOM", body: "Efficient diffing & updates." }
        ]);
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  // Declarative Rendering (React decides DOM updates)
  const renderContent = () => {
    if (status === "loading") {
      return <p className="info">Loading data...</p>;
    }

    if (status === "error") {
      return (
        <div className="info">
          <p>Something went wrong.</p>
          <button onClick={simulateFetch}>Retry</button>
        </div>
      );
    }

    return data.map(item => (
      <DataCard key={item.id} title={item.title} body={item.body} />
    ));
  };

  return (
    <div className="app">
      <h1>React Rendering Pipeline Demo</h1>
      <p className="subtitle">
        UI automatically updates when state changes (Virtual DOM + Diffing).
      </p>

      <div className="container">
        {renderContent()}
      </div>

      <button className="refresh" onClick={simulateFetch}>
        Trigger State Change
      </button>
    </div>
  );
}