import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";
import multer from "multer";

dotenv.config();

// AWS S3 Config
const s3 = new S3Client({
  region: process.env.VITE_AWS_REGION, // Example: "us-east-1"
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function uploadToS3(file) {
  try {
    if (!file) throw new Error("No file provided");

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${crypto.randomUUID()}${fileExtension}`;

    // Upload to S3
    const params = {
      Bucket: process.env.VITE_AWS_BUCKET_NAME,
      Key: uniqueName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return `https://${process.env.VITE_AWS_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/${uniqueName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Upload failed");
  }
}

export function uploadMiddleware() {
  return upload.single("file");
}
