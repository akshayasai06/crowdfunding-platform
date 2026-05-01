const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch {
    res.status(500).send("Error");
  }
});


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      role: "user"
    });

    res.json(user);
  } catch (err) {
    res.status(500).send("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.send(null);

  res.json(user);
});

module.exports = router;