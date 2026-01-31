const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "Prelims",
        "Mains GS",
        "Optional",
        "Current Affairs",
        "Sectional"
      ],
      required: true
    },
    syllabus: String,
    durationMinutes: Number,
    totalMarks: Number,
    // V1: just upload a link or file path to PDF/Google Form
    link: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
