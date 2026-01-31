
const router = require("express").Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const {
  getEvents,
  createEvent,
  getEventById,
  deleteEvent
} = require("../controllers/eventController");

// Public: list all events
router.get("/", getEvents);

// Public: get single event (optional)
router.get("/:id", getEventById);

// Admin: create event
router.post("/", auth, adminOnly, createEvent);

// Admin: delete event (optional)
router.delete("/:id", auth, adminOnly, deleteEvent);

module.exports = router; 
