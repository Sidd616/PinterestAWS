import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
import crypto from "crypto";
import multer from "multer";
import { dynamodb } from "./dynamodb.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

dotenv.config();

const s3 = new S3Client({
  region: process.env.VITE_AWS_REGION,
  //endpoint: `https://s3.${process.env.VITE_AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function uploadToS3(file, postData) {
  try {
    if (!file) throw new Error("No file provided");

    // Generate unique filename
    const fileExtension = file.originalname.split(".").pop();
    const uniqueName = `${crypto.randomUUID()}.${fileExtension}`;

    // Upload to S3
    const params = {
      Bucket: process.env.VITE_AWS_BUCKET_NAME,
      Key: uniqueName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));
    const fileUrl = `https://${process.env.VITE_AWS_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/${uniqueName}`;

  //  console.log("Post data:", postData);

    // Insert into DynamoDB
    const postItem = {
      id: crypto.randomUUID(), // Unique post ID
      userId: postData.userId,
      username: postData.username,
      title: postData.title,
      description: postData.description,
      imageUrl: fileUrl,
      likes: postData.likes || [],
      comments: postData.comments || [],
      createdAt: new Date().toISOString(),
    };

  //  console.log("Post item:", postItem);

    await dynamodb.send(
      new PutCommand({
        TableName: "Posts",
        Item: postItem,
      })
    );

    return {
      success: true,
      fileUrl,
      postId: postItem.id,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Upload or database insert failed");
  }
}

export function uploadMiddleware() {
  return upload.single("file");
}

export async function getPosts() {
  try {
    const data = await dynamodb.send(
      new ScanCommand({
        TableName: "Posts",
      })
    );
    return data.Items;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}