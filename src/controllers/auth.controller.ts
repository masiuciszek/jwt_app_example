import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  username: string;
  password: string;
}

export const users: Array<User> = [
  { id: 1, username: "logan", password: "123456" },
  { id: 2, username: "linda", password: "123456" },
];

export const login = (req: Request, res: Response, next: NextFunction) => {
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

  const date = new Date();
  const cookieOptions = {
    expire: date.setHours(date.getHours() + 24),
    httpOnly: false,
    secure: false,
  };

  const token = jwt.sign(
    { sub: user.id, username: user.username },
    "secret_key",
    { expiresIn: "3 hours" },
  );

  users.push(user);
  res
    .status(201)
    .cookie("auth_cookie", token, cookieOptions)
    .json({ jwt_token: token, user, users });
};
