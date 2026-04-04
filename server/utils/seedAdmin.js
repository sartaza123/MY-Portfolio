const User = require("../models/User");

const ADMIN = {
  name: "Admin",
  email: "admin@portfolio.dev",
  password: "admin123",
};

const seedAdmin = async () => {
  try {
    // Safety: only run if DB is connected
    if (!User.db.readyState) {
      console.log("Database not connected, skipping seed...");
      return;
    }

    const existing = await User.findOne({ email: ADMIN.email });

    if (existing) {
      console.log("Admin already exists");
      return;
    }

    await User.create(ADMIN);

    console.log("Admin created successfully");
    console.log(`Login → ${ADMIN.email} / ${ADMIN.password}`);
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};

module.exports = seedAdmin;
