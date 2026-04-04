require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const seedAdmin = require("./utils/seedAdmin");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start the server
connectDB().then(async () => {
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
});
