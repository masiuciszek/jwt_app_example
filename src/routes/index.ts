import { Router } from "express";
import * as auth from "../controllers/auth.controller";
const router = Router();

router.route("/login").post(auth.login);

export { router };
