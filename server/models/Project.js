const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    techStack: {
      type: String,
      required: [true, "Tech stack is required"],
    },
    image: {
      type: String,
      default: "",
    },
    liveLink: {
      type: String,
      default: "",
    },
    sourceCodeLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
