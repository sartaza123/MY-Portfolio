const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true,
    },
    issuer: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: [true, "Certificate image is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Certificate", certificateSchema);
