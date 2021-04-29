import express from "express";
import { User } from "./controllers/User";

import { UserValidator } from "./middlewares/UserValidator";

const userValidator = new UserValidator();
const user = new User();

const routes = express.Router();

routes.post("/user", userValidator.execute, user.create);

export { routes };
