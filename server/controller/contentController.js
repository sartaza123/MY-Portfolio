const SiteContent = require("../models/SiteContent");

const DEFAULT_CONTENT = {
  brandName: "SARTAZ",
  heroOutlineTitle: "MERN-STACK",
  heroScriptTitle: "Developer",
  heroDescription:
    "I build modern, scalable web applications that blend immersive interfaces with reliable backend systems.",
  heroImage: "",
  aboutLabel: "About Me",
  aboutOutlineTitle: "WEBSITE",
  aboutScriptTitle: "Designer",
  aboutHeading: "I'm a Full Stack Developer",
  aboutDescription:
    "I specialize in the MERN stack, focused on building scalable web applications with modern, interactive user interfaces.",
  contactHeading: "Let's build something exceptional.",
  contactSubheading:
    "Open to freelance work, collaborations, and full-time roles.",
  contactEmail: "admin@portfolio.dev",
  location: "India",
  githubUrl: "",
  linkedinUrl: "",
  education: [],
  experience: [],
  personalSkills: [],
  marqueeItems: [
    "Responsive Design",
    "UI/UX",
    "Problem Solving",
    "Debugging",
    "Interactive Websites",
  ],
};

const sanitiseList = (value) => {
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

const parseStructuredField = (value, fallback = []) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) return fallback;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
};

const ensureContent = async () => {
  let content = await SiteContent.findOne({ singletonKey: "main" });

  if (!content) {
    content = await SiteContent.create({
      singletonKey: "main",
      ...DEFAULT_CONTENT,
    });
  }

  return content;
};

const getSiteContent = async (req, res, next) => {
  try {
    const content = await ensureContent();
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

const updateSiteContent = async (req, res, next) => {
  try {
    const current = await ensureContent();
    const body = req.body || {};

    const updates = {
      brandName: body.brandName?.trim() || current.brandName,
      heroOutlineTitle: body.heroOutlineTitle?.trim() || current.heroOutlineTitle,
      heroScriptTitle: body.heroScriptTitle?.trim() || current.heroScriptTitle,
      heroDescription: body.heroDescription?.trim() || current.heroDescription,
      aboutLabel: body.aboutLabel?.trim() || current.aboutLabel,
      aboutOutlineTitle:
        body.aboutOutlineTitle?.trim() || current.aboutOutlineTitle,
      aboutScriptTitle:
        body.aboutScriptTitle?.trim() || current.aboutScriptTitle,
      aboutHeading: body.aboutHeading?.trim() || current.aboutHeading,
      aboutDescription:
        body.aboutDescription?.trim() || current.aboutDescription,
      contactHeading: body.contactHeading?.trim() || current.contactHeading,
      contactSubheading:
        body.contactSubheading?.trim() || current.contactSubheading,
      contactEmail: body.contactEmail?.trim() || current.contactEmail,
      location: body.location?.trim() || current.location,
      githubUrl: body.githubUrl?.trim() || current.githubUrl,
      linkedinUrl: body.linkedinUrl?.trim() || current.linkedinUrl,
      education: parseStructuredField(body.education, current.education),
      experience: parseStructuredField(body.experience, current.experience),
      personalSkills: sanitiseList(body.personalSkills),
      marqueeItems: sanitiseList(body.marqueeItems),
    };

    if (req.file) {
      updates.heroImage = `/uploads/${req.file.filename}`;
    }

    const content = await SiteContent.findOneAndUpdate(
      { singletonKey: "main" },
      updates,
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,
      data: content,
      message: "Portfolio content updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSiteContent,
  updateSiteContent,
};
