import React, { useState, useEffect } from 'react';
import './App.css';

const indianNames = ["Arjun Mehta", "Priya Sharma", "Rohan Gupta", "Ananya Iyer", "Suresh Kumar", "Aditi Rao"];

export default function BankApp() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=6')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((user, i) => ({
          id: user.id,
          name: indianNames[i],
          // Clean email: arjun.mehta@gmail.com
          email: indianNames[i].toLowerCase().replace(" ", ".") + "@gmail.com",
          accNo: Math.floor(100000000000 + Math.random() * 900000000000),
          status: 'Pending'
        }));
        setUsers(formatted);
      });
  }, []);

  const toggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Pending' ? 'Active' : 'Pending' } : u
    ));
  };

  return (
    <div className="dashboard">
      <header>
        <h1>India Digital Bank</h1>
        <p>Customer Management Portal</p>
      </header>

      <div className="card-grid">
        {users.map(user => (
          <div key={user.id} className="bank-card">
            {/* Status indicator bar at the top */}
            <div className={`indicator ${user.status.toLowerCase()}`}></div>
            
            <div className="card-body">
              <div className="avatar">{user.name[0]}</div>
              <h3>{user.name}</h3>
              <p className="acc-label">A/C: <span>{user.accNo}</span></p>
              <p className="email-text">{user.email}</p>
              
              <div className={`status-badge ${user.status.toLowerCase()}`}>
                {user.status}
              </div>
            </div>

            <button className="update-btn" onClick={() => toggleStatus(user.id)}>
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}