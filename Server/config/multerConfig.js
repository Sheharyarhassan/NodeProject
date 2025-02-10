const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store in uploads folder
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")); // Unique filename
   }
});

// File Upload Middleware
const upload = multer({
   storage: storage,
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
   fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
         cb(null, true);
      } else {
         cb(new Error("Only image files are allowed!"), false);
      }
   },
});

module.exports = upload;
