import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: ""
  });

  const [updates, setUpdates] = useState({});

  useEffect(() => {
    fetchProjects();

    axios.get("http://localhost:5000/api/donations")
      .then(res => setDonations(res.data));
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  const addProject = async () => {
    if (!newProject.title || !newProject.goal) {
      alert("Please fill required fields");
      return;
    }

    await axios.post("http://localhost:5000/api/projects", newProject);

    alert("Project added");

    setNewProject({
      title: "",
      description: "",
      goal: "",
      deadline: ""
    });

    fetchProjects();
  };

  const addUpdate = async (id, text) => {
    if (!text) return alert("Enter update");

    await axios.post(`http://localhost:5000/api/projects/update/${id}`, { text });

    alert("Update added");

    setUpdates({ ...updates, [id]: "" });

    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await axios.delete(`http://localhost:5000/api/projects/${id}`);

    alert("Project deleted");
    fetchProjects();
  };

  const editProject = async (id) => {
    const newTitle = prompt("Enter new title");
    if (!newTitle) return;

    await axios.put(`http://localhost:5000/api/projects/${id}`, {
      title: newTitle
    });

    alert("Project updated");
    fetchProjects();
  };

  return (
    <div className="container" style={{ color: "white" }}>
      
      <h2>Admin Dashboard 👩‍💼</h2>

      {/* 🔥 ADD PROJECT CARD */}
      <div className="admin-card">
        <h3>Add Project</h3>

        <input
          className="input"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Goal"
          value={newProject.goal}
          onChange={(e) =>
            setNewProject({ ...newProject, goal: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Deadline (YYYY-MM-DD)"
          value={newProject.deadline}
          onChange={(e) =>
            setNewProject({ ...newProject, deadline: e.target.value })
          }
        />

        <button className="btn" onClick={addProject}>
          Add Project
        </button>
      </div>

      <h3>Manage Projects</h3>

      {projects.map((p) => (
        <div key={p._id} className="card">

          <h3 style={{ color: "black" }}>{p.title}</h3>
          <p style={{ color: "black" }}>{p.description}</p>

          <p style={{ color: "black" }}>
            <b>Goal:</b> ₹{p.goal}
          </p>

          <p style={{ color: "black" }}>
            <b>Raised:</b> ₹{p.raised}
          </p>

          <p style={{ color: "black" }}>
            <b>Deadline:</b> {new Date(p.deadline).toDateString()}
          </p>

          {/* Donations */}
          <div style={{ marginTop: "10px" }}>
            <strong style={{ color: "black" }}>Donations:</strong>

            {donations.filter(d => d.projectId === p._id).length === 0 ? (
              <p style={{ color: "gray" }}>No donations yet</p>
            ) : (
              donations
                .filter(d => d.projectId === p._id)
                .map((d, i) => (
                  <p key={i} style={{ color: "gray" }}>
                    {d.donorName} → ₹{d.amount}
                  </p>
                ))
            )}
          </div>

          {/* Updates */}
          {p.updates && p.updates.length > 0 && (
            <div>
              <strong style={{ color: "black" }}>Updates:</strong>
              {p.updates.map((u, i) => (
                <p key={i} style={{ fontSize: "13px", color: "gray" }}>
                  📢 {u.text}
                </p>
              ))}
            </div>
          )}

          <br />

          {/* Add Update */}
          <input
            className="input"
            placeholder="Write update..."
            value={updates[p._id] || ""}
            onChange={(e) =>
              setUpdates({ ...updates, [p._id]: e.target.value })
            }
          />

          <button
            className="btn"
            onClick={() => addUpdate(p._id, updates[p._id])}
          >
            Add Update
          </button>

          <br /><br />

          {/* Actions */}
          <button className="btn" onClick={() => editProject(p._id)}>
            Edit ✏️
          </button>

          <button
            className="btn"
            style={{ background: "red", marginLeft: "10px" }}
            onClick={() => deleteProject(p._id)}
          >
            Delete ❌
          </button>

        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;