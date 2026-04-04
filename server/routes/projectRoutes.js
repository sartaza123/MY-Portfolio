const express = require("express");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controller/projectController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { imageUpload } = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(protect, adminOnly, imageUpload.single("image"), createProject);

router
  .route("/:id")
  .get(getProject)
  .put(protect, adminOnly, imageUpload.single("image"), updateProject)
  .delete(protect, adminOnly, deleteProject);

module.exports = router;
