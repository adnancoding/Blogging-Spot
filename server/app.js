import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://localhost:27017/bloggin-app";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("server started on port 5000");
});
