import express from "express";
import { uploadToS3, uploadMiddleware, getPosts } from "./s3server.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Upload endpoint
app.post("/upload", uploadMiddleware(), async (req, res) => {
  try {
 //   console.log("req.body:", req.body);
  //  console.log("req: ", req);
    const postData = {
      userId: req.body.userId,
      username: req.body.username,
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt,
      likes: req.body.likes ? JSON.parse(req.body.likes) : [],
      comments: req.body.comments ? JSON.parse(req.body.comments) : [],
    };
  //  console.log("Post data in server:", postData);
    const result = await uploadToS3(req.file, postData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Homepage endpoint
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
   // console.log(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
