const express = require("express");
const router = express.Router();
const {
  loginUser,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// PUT /api/auth/reset-password/:token
router.put("/reset-password/:token", resetPassword);

// GET /api/auth/me  (protected)
router.route("/me").get(protect, getMe).put(protect, updateMe);
router.put("/change-password", protect, changePassword);

module.exports = router;
