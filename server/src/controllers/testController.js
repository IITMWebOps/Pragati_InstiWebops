
const Test = require("../models/Test");


exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    console.error("Error fetching tests:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//create new mock test (admin only)
exports.createTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    console.error("Error creating test:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json(test);
  } catch (err) {
    console.error("Error fetching test:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json({ message: "Test deleted" });
  } catch (err) {
    console.error("Error deleting test:", err);
    res.status(500).json({ message: "Server error" });
  }
};
