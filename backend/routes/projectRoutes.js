const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create project (Admin)
router.post("/", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});


router.put("/:id", async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


router.put("/release/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );
  res.json(project);
});

router.post("/update/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        updates: { text: req.body.text }
      }
    },
    { new: true }
  );

  res.json(project);
});

module.exports = router;