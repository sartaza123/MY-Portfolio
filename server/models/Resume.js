const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
    },
    file: {
      type: String,
      required: [true, "Resume file is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
