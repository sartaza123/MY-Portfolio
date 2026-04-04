const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  toggleReadMessage,
  deleteMessage,
} = require("../controller/messageController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST /api/messages   → public (from contact form)
// GET  /api/messages   → protected (admin view)
router.route("/").post(createMessage).get(protect, adminOnly, getMessages);

// PATCH /api/messages/:id/read → protected (toggle read status)
router.patch("/:id/read", protect, adminOnly, toggleReadMessage);

// DELETE /api/messages/:id → protected
router.delete("/:id", protect, adminOnly, deleteMessage);

module.exports = router;
