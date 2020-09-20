import express, { Application } from "express";
import cookieparser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes";
import { router as resourceRoutes } from "./routes/resource.routes";
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

app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
