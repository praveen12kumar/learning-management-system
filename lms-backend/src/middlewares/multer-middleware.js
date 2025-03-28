import multer from "multer";
import fs from "fs";
import path from "path";
import uuidv4  from "uuid4";

const uploadDir = "./public/uploads";

// Ensure the upload directory exists, create it if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Creates parent directories if needed
}

// Configure storage settings for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files in the specified upload directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`; // Generate a unique file name using timestamp and UUID
        const fileExt = path.extname(file.originalname); // Extract the file extension
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`); // Construct the final file name
    }
});

// Define file filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg", "image/png", "image/webp",  // Allow image formats
        "video/mp4", "video/webm",                // Allow video formats
        "application/pdf"                         // Allow PDF files
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Invalid file type. Only images, videos, and PDFs are allowed."), false); // Reject the file
    }
};

// Configure and export the Multer upload middleware
export const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Set max file size to 100MB
    fileFilter
});
