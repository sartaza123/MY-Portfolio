const express = require("express");
const {
  getSiteContent,
  updateSiteContent,
} = require("../controller/contentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { imageUpload } = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get(getSiteContent)
  .put(protect, adminOnly, imageUpload.single("heroImage"), updateSiteContent);

module.exports = router;
