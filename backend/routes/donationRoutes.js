const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Donation = require("../models/Donation");

// POST donation
router.post("/:id", async (req, res) => {
  const { amount, name, email } = req.body;

  await Donation.create({
    projectId: req.params.id,
    donorName: name,
    donorEmail: email,
    amount
  });

  const project = await Project.findById(req.params.id);
  project.raised += Number(amount);
  await project.save();

  res.send("Donation successful");
});

// GET all donations
router.get("/", async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

module.exports = router;