import { useState } from "react";
import axios from "axios";
import "../App.css";

function AdminLogin() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      if (!res.data) {
        alert("Invalid credentials");
        return;
      }

      // 🔒 ONLY ADMIN ALLOWED
      if (res.data.role !== "admin") {
        alert("Access denied! Not an admin ❌");
        return;
      }

      // ✅ Save admin
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Go to admin dashboard
      window.location = "/admin";

    } catch {
      alert("Login error");
    }
  };

  return (
    <div className="center-page">
      <div className="login-card">
        <h2>Admin Login 👩‍💼</h2>

        <input
          className="input"
          placeholder="Admin Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn" onClick={login}>
          Login as Admin 🚀
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;