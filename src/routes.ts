import express from "express";
import { User } from "./controllers/User";
import { BasicAuthHeaderValidator } from "./middlewares/BasicAuthHeaderValidator";

import { UserValidator } from "./middlewares/UserValidator";

const basicAuthHeaderValidator = new BasicAuthHeaderValidator();
const userValidator = new UserValidator();
const user = new User();

const routes = express.Router();

routes.post("/user", userValidator.execute, user.create);
routes.get("/auth", basicAuthHeaderValidator.execute, user.login);

export { routes };
