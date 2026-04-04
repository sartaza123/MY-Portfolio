const fs = require("fs");
const path = require("path");
const Certificate = require("../models/Certificate");

const removeUploadedFile = (filePath) => {
  if (!filePath) return;

  const resolvedPath = path.join(process.cwd(), filePath.replace(/^\//, ""));
  if (fs.existsSync(resolvedPath)) {
    fs.unlinkSync(resolvedPath);
  }
};

const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    next(error);
  }
};

const createCertificate = async (req, res, next) => {
  try {
    const existingCount = await Certificate.countDocuments();
    if (existingCount >= 5) {
      res.status(400);
      throw new Error("You can upload up to 5 certificates only");
    }

    const { title, issuer } = req.body;

    if (!title?.trim()) {
      res.status(400);
      throw new Error("Certificate title is required");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Certificate image is required");
    }

    const certificate = await Certificate.create({
      title: title.trim(),
      issuer: issuer?.trim() || "",
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      data: certificate,
      message: "Certificate uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }

    removeUploadedFile(certificate.image);
    await certificate.deleteOne();

    res.status(200).json({
      success: true,
      data: { id: req.params.id },
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  deleteCertificate,
};
