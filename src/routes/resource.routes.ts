import { Router } from "express";
import * as resource from "../controllers/resource.controller";
import expressJwt from "express-jwt";

const router = Router();

const jwtCheck = expressJwt({
  secret: "secret_key",
  algorithms: ["HS256"],
});

router.route("/").get(resource.getResources);

router.route("/secret").get(jwtCheck, resource.getResourcesSecrest);

export { router };
