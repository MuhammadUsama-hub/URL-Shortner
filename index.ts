import express from "express";
import { connectDB } from "./connects/connects.js";
import { router } from "./routes/url.js";
//mongodb connection
connectDB("mongodb://localhost:27017/URL-Shortner")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("Error:", err));

const app = express();
const port = 8000;

// middleware
app.use(express.json());
// Routes
app.use("/url", router);

app.listen(port, () => {
  console.log(`Server has started ${port}`);
});
