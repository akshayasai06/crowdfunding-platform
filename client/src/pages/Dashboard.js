import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data));
  }, []);

  return (
    <>
      <div className="navbar">🚀 Crowdfunding Platform</div>

      <div className="container">
        <h2 style={{ color: "white" }}>Explore Projects</h2>

        <div className="grid">
          {projects.map(p => {
            const percent = (p.raised / p.goal) * 100;

            return (
              <div className="card" key={p._id}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
 {p.updates && p.updates.length > 0 && (
    <div style={{ marginTop: "10px" }}>
      <strong>Updates:</strong>
      {p.updates.map((u, i) => (
        <p key={i} style={{ fontSize: "13px", color: "gray" }}>
          📢 {u.text}
        </p>
      ))}
    </div>
  )}
                <p>₹{p.raised} / ₹{p.goal}</p>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <button
                  className="btn"
                  onClick={() => window.location = `/donate/${p._id}`}
                >
                  Donate ❤️
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}


export default Dashboard;