import { useState } from "react";
import axios from "axios";
import "../App.css";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      if (!res.data) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect
      if (res.data.role === "admin") {
        window.location = "/admin";
      } else {
        window.location = "/dashboard";
      }

    } catch {
      alert("Login error");
    }
  };

  return (
    <div className="center-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn" onClick={login}>
          Login 🚀
        </button>

        <p style={{ marginTop: "10px", color: "white" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "cyan", cursor: "pointer" }}
            onClick={() => (window.location = "/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;