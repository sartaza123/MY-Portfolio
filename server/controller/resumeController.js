const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");

const deleteUploadedFile = (filePath) => {
  if (!filePath) return;

  const resolvedPath = path.join(process.cwd(), filePath.replace(/^\//, ""));
  if (fs.existsSync(resolvedPath)) {
    fs.unlinkSync(resolvedPath);
  }
};

const uploadResume = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      res.status(400);
      throw new Error("Resume title is required");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Resume PDF is required");
    }

    await Resume.updateMany({}, { isActive: false });

    const resume = await Resume.create({
      title: title.trim(),
      file: `/uploads/${req.file.filename}`,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: resume,
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ isActive: true }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      res.status(404);
      throw new Error("Resume not found");
    }

    deleteUploadedFile(resume.file);
    await resume.deleteOne();

    const nextActiveResume = await Resume.findOne().sort({ updatedAt: -1 });
    if (nextActiveResume) {
      nextActiveResume.isActive = true;
      await nextActiveResume.save();
    }

    res.status(200).json({
      success: true,
      data: { id: req.params.id },
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadResume,
  getResume,
  deleteResume,
};
