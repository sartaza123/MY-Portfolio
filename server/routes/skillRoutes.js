const express = require("express");
const router = express.Router();
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controller/skillController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/skills      → public
// POST /api/skills     → protected
router.route("/").get(getSkills).post(protect, adminOnly, createSkill);

// PUT /api/skills/:id  → protected
// DELETE /api/skills/:id → protected
router.route("/:id").put(protect, adminOnly, updateSkill).delete(protect, adminOnly, deleteSkill);

module.exports = router;
