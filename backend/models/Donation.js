const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  projectId: String,
  donorName: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);