const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});
const User = require("./models/User");

app.get("/delete-users", async (req, res) => {
  await User.deleteMany({});
  res.send("All users deleted");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});