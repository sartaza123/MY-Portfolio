const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, liveLink, sourceCodeLink } = req.body;

    if (!title || !description || !techStack) {
      res.status(400);
      throw new Error("Title, description, and tech stack are required");
    }

    // ✅ HANDLE IMAGE UPLOAD (MULTER)
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const project = await Project.create({
      title,
      description,
      techStack,
      liveLink,
      sourceCodeLink,
      image,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    // ✅ HANDLE IMAGE UPDATE (optional)
    let updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      data: { id: req.params.id },
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
