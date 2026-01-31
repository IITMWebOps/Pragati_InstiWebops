const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: Date,
    category: {
      type: String,
      enum: [
        "Guest Lecture",
        "GD/Debate",
        "Essay",
        "Workshop",
        "Study Group",
        "Scholarship Test"
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
