const router = require("express").Router();

const { auth } = require("../middleware/authMiddleware");
const { register, login, me } = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route (IMP)
router.get("/me", auth, me);

module.exports = router;