import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";

function Donate() {
  const { id } = useParams();

  // 🔥 Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [amount, setAmount] = useState("");

  const donate = async () => {
    if (!amount || !name || !email) {
      alert("Please fill all fields");
      return;
    }

    // 💳 Fake payment processing
    alert("Processing payment... 💳");

    setTimeout(async () => {
      try {
        await axios.post(`http://localhost:5000/api/donations/${id}`, {
          amount: Number(amount),
          name,
          email
        });

        // 🎉 Generate fake transaction ID
        const txn = "TXN" + Math.floor(Math.random() * 1000000);

        alert(`🎉 Payment Successful!\nTransaction ID: ${txn}`);

        window.location = "/dashboard";

      } catch (err) {
        alert("Payment failed ❌");
      }
    }, 1500);
  };

  return (
    <div className="center-page">
      <div className="donate-card">
        <h2>Support this Project 💙</h2>

        {/* NAME */}
        <input
          className="input"
          value={name}
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          className="input"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* AMOUNT */}
        <input
          type="number"
          className="input"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn" onClick={donate}>
          Donate Now 🚀
        </button>
      </div>
    </div>
  );
}

export default Donate;