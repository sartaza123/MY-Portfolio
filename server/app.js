const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Route imports
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const contentRoutes = require("./routes/contentRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

// ─── CORS ───────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Admin panel (Vite default)
      "http://localhost:5174", // Portfolio frontend (fallback port)
      "http://localhost:3000", // Portfolio frontend alternative
      "http://localhost:3001", // Alternative
    ],
    credentials: true,
  }),
);

// ─── Body parsers ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Portfolio API is running" });
});

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/uploads", express.static("uploads"));

// ─── Error handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
