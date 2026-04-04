const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Skill title is required"],
      trim: true,
    },
    para: {
      type: String,
      required: [true, "Skill description is required"],
      trim: true,
    },
    points: {
      type: [String],
      validate: {
        validator: (value) =>
          Array.isArray(value) &&
          value.length >= 3 &&
          value.length <= 4 &&
          value.every((item) => typeof item === "string" && item.trim().length > 0),
        message: "Skill points must contain 3 to 4 non-empty items",
      },
      required: [true, "Skill points are required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
