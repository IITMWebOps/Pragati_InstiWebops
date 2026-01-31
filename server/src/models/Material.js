const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "Bluebook",
        "NCERT",
        "Standard Book",
        "Government Report",
        "Magazine",
        "Video"
      ],
      required: true
    },
    subject: String,
    description: String,
    url: String // Google Drive / YouTube / PDF link
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
