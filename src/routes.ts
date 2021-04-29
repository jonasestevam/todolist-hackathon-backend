import express from "express";
import { TaskController } from "./controllers/Task";
import { UserController } from "./controllers/User";
import { BasicAuthHeaderValidator } from "./middlewares/BasicAuthHeaderValidator";
import { TaskValidator } from "./middlewares/TaskValidator";
import { UserAuthentication } from "./middlewares/UserAuthentication";

import { UserValidator } from "./middlewares/UserValidator";

const basicAuthHeaderValidator = new BasicAuthHeaderValidator();
const userAuthentication = new UserAuthentication();

const userValidator = new UserValidator();
const userController = new UserController();

const taskController = new TaskController();
const taskValidator = new TaskValidator();

const routes = express.Router();

routes.post("/user", userValidator.execute, userController.create);
routes.get("/auth", basicAuthHeaderValidator.execute, userController.login);

routes.post(
  "/task",
  userAuthentication.execute,
  taskValidator.execute,
  taskController.create
);

export { routes };
