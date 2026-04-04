const express = require("express");
const router = express.Router();
const {
  loginUser,
  getMe,
  updateMe,
  changePassword,
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/me  (protected)
router.route("/me").get(protect, getMe).put(protect, updateMe);
router.put("/change-password", protect, changePassword);

module.exports = router;
