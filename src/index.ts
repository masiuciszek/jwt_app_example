import express, { Application } from "express";
import cookieparser from "cookie-parser";
import { router as authRotes } from "./routes";
import cors from "cors";
import "dotenv/config";
import { users } from "./controllers/auth.controller";

const app: Application = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use(cors());
app.use(cookieparser());

app.get("/", (req, res) => {
  res.json(users);
});

app.post("/login", (req, res) => {});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.use("/api/auth", authRotes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
