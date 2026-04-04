const Skill = require("../models/Skill");

const normalisePoints = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${item ?? ""}`.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const serialiseSkill = (skill) => {
  const item = skill.toObject ? skill.toObject() : skill;

  return {
    ...item,
    title: item.title || item.name || "",
    para:
      item.para ||
      item.description ||
      (item.level ? `${item.level} level capability` : ""),
    points:
      item.points?.length
        ? item.points
        : [item.name, item.level, item.category].filter(Boolean),
  };
};

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: skills.map(serialiseSkill),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private (Admin)
const createSkill = async (req, res, next) => {
  try {
    const { title, para } = req.body;
    const points = normalisePoints(req.body.points);

    if (!title?.trim() || !para?.trim() || points.length < 3 || points.length > 4) {
      res.status(400);
      throw new Error("Skill title, description, and 3 to 4 points are required");
    }

    const skill = await Skill.create({
      title: title.trim(),
      para: para.trim(),
      points,
    });

    res.status(201).json({
      success: true,
      data: serialiseSkill(skill),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found");
    }

    const updates = {
      title: req.body.title?.trim(),
      para: req.body.para?.trim(),
      points: normalisePoints(req.body.points),
    };

    if (!updates.title || !updates.para || updates.points.length < 3 || updates.points.length > 4) {
      res.status(400);
      throw new Error("Skill title, description, and 3 to 4 points are required");
    }

    const updated = await Skill.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: serialiseSkill(updated),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found");
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      data: { id: req.params.id },
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
