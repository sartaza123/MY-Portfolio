const express = require("express");
const cors = require("cors");
const path = require("path");
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
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  // Production domains — set ALLOWED_ORIGINS in your deployment env
  // e.g. ALLOWED_ORIGINS=https://my-portfolio.vercel.app,https://my-admin.vercel.app
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Error handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
