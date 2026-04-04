const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadsDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const safeBaseName = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(
      null,
      `${safeBaseName || "file"}-${uniqueName}${path.extname(file.originalname)}`,
    );
  },
});

const createUploader = ({ allowedMimeTypes, maxSize, errorMessage }) =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
        return;
      }

      cb(new Error(errorMessage), false);
    },
    limits: { fileSize: maxSize },
  });

const imageUpload = createUploader({
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"],
  maxSize: 2 * 1024 * 1024,
  errorMessage: "Only image files are allowed",
});

const pdfUpload = createUploader({
  allowedMimeTypes: ["application/pdf"],
  maxSize: 5 * 1024 * 1024,
  errorMessage: "Only PDF files are allowed",
});

module.exports = {
  imageUpload,
  pdfUpload,
};
