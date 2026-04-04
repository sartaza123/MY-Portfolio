const express = require("express");
const {
  uploadResume,
  getResume,
  deleteResume,
} = require("../controller/resumeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { pdfUpload } = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get(getResume)
  .post(protect, adminOnly, pdfUpload.single("file"), uploadResume);

router.delete("/:id", protect, adminOnly, deleteResume);

module.exports = router;
