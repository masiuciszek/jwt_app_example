import express, { Application } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app: Application = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());

interface User {
  id: number;
  username: string;
  password: string;
}
const users: Array<User> = [
  { id: 1, username: "logan", password: "123456" },
  { id: 2, username: "linda", password: "123456" },
];

app.get("/", (req, res) => {
  res.send("Hello");
  console.log(process.env.PORT);
});

app.post("/login", (req, res) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
  };
  if (!req.body.username || !req.body.password) {
    throw new Error("Please fill in username and password");
  }
  const checkUser = users.find((u) => u.username === user.username);
  if (checkUser) {
    throw new Error("user already exits");
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username },
    "secret_key",
    { expiresIn: "3 hours" },
  );

  users.push(user);
  res.status(201).json({ jwt_token: token, user, users });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
