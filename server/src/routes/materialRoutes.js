const router = require("express").Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const { getMaterials, createMaterial } = require("../controllers/materialController");

router.get("/", getMaterials);
router.post("/", auth, adminOnly, createMaterial);

module.exports = router;
