
const router = require("express").Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const {
  getTests,
  createTest,
  getTestById,
  deleteTest
} = require("../controllers/testController");

// Public: list tests
router.get("/", getTests);

// Public: single test by id 
router.get("/:id", getTestById);

// Admin: create test
router.post("/", auth, adminOnly, createTest);

// Admin: delete test 
router.delete("/:id", auth, adminOnly, deleteTest);

module.exports = router; 
