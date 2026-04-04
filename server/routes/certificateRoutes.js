const express = require("express");
const {
  getCertificates,
  createCertificate,
  deleteCertificate,
} = require("../controller/certificateController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { imageUpload } = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get(getCertificates)
  .post(protect, adminOnly, imageUpload.single("image"), createCertificate);

router.route("/:id").delete(protect, adminOnly, deleteCertificate);

module.exports = router;
