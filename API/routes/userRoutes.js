import { Router } from "express";
import userController from "../controllers/userController.js";

const routes = new Router();

routes
  .post("/login", userController.login)
  .get("/", userController.show)
  .post("/users", userController.create)
  .delete("/deletarUser/:email", userController.remove)

export default routes;