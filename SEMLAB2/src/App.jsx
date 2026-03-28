import React, { useState } from "react";
import "./App.css";

function App() {
  const [marks, setMarks] = useState({ maths: "", english: "", physics: "" });
  const [result, setResult] = useState({ total: 0, average: 0, grade: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks({ ...marks, [name]: Number(value) });
  };

  const calculate = () => {
    const total = marks.maths + marks.english + marks.physics;
    const average = total / 3;

    let grade = "";
    if (average >= 90) grade = "A+";
    else if (average >= 75) grade = "A";
    else if (average >= 60) grade = "B";
    else if (average >= 45) grade = "C";
    else grade = "F";

    setResult({ total, average, grade });
  };

  return (
    <div className="dashboard">
      <h1> Student Marks Calculator</h1>

      <div className="form-section">
        <label>
          Maths:
          <input
            type="number"
            name="maths"
            value={marks.maths}
            onChange={handleChange}
          />
        </label>
        <label>
          English:
          <input
            type="number"
            name="english"
            value={marks.english}
            onChange={handleChange}
          />
        </label>
        <label>
          Physics:
          <input
            type="number"
            name="physics"
            value={marks.physics}
            onChange={handleChange}
          />
        </label>
        <button onClick={calculate}>Calculate</button>
      </div>

      <div className="results-section">
        <h2>Results</h2>
        <p>Total Marks: {result.total}</p>
        <p>Average Marks: {result.average}</p>
        <p>Grade: {result.grade}</p>
      </div>
    </div>
  );
}

export default App;
