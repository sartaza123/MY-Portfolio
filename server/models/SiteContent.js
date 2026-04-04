const mongoose = require("mongoose");

const educationItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    institute: {
      type: String,
      trim: true,
      default: "",
    },
    completeBy: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

const experienceItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    organization: {
      type: String,
      trim: true,
      default: "",
    },
    duration: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

const siteContentSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: "main",
      unique: true,
      immutable: true,
    },
    brandName: {
      type: String,
      trim: true,
      default: "Portfolio",
    },
    heroOutlineTitle: {
      type: String,
      trim: true,
      default: "MERN-STACK",
    },
    heroScriptTitle: {
      type: String,
      trim: true,
      default: "Developer",
    },
    heroDescription: {
      type: String,
      trim: true,
      default:
        "I build modern, scalable web applications that blend immersive interfaces with reliable backend systems.",
    },
    heroImage: {
      type: String,
      default: "",
    },
    aboutLabel: {
      type: String,
      trim: true,
      default: "About Me",
    },
    aboutOutlineTitle: {
      type: String,
      trim: true,
      default: "WEBSITE",
    },
    aboutScriptTitle: {
      type: String,
      trim: true,
      default: "Designer",
    },
    aboutHeading: {
      type: String,
      trim: true,
      default: "I'm a Full Stack Developer",
    },
    aboutDescription: {
      type: String,
      trim: true,
      default:
        "I specialize in the MERN stack and focus on building scalable web applications with modern, interactive user interfaces.",
    },
    contactHeading: {
      type: String,
      trim: true,
      default: "Let's build something exceptional.",
    },
    contactSubheading: {
      type: String,
      trim: true,
      default: "Open to freelance work, collaborations, and full-time roles.",
    },
    contactEmail: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: "",
    },
    education: {
      type: [educationItemSchema],
      default: [],
    },
    experience: {
      type: [experienceItemSchema],
      default: [],
    },
    personalSkills: {
      type: [String],
      default: [],
    },
    marqueeItems: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
