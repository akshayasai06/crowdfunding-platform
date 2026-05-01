const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  goal: Number,
  raised: { type: Number, default: 0 },
  deadline: Date,
  status: { type: String, default: "active" },

  updates: [
    {
      text: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Project", projectSchema);