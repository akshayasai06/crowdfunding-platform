import { useState } from "react";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", data);
    alert("Signup successful");
    window.location = "/";
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input type="password" placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;