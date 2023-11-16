import { Router } from "express";
import userController from "../controllers/userController.js";

const routes = new Router();

routes
  .post("/login", userController.login)
  .get("/", userController.show)
  .post("/users", userController.create)

export default routes;