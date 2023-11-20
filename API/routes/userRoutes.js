import { Router } from "express";
import userController from "../controllers/userController.js";

const routes = new Router();

routes
  .get("/", userController.show)
  .post("/users", userController.create)
  .delete("/deletarUser/:email", userController.remove)
  .post("/adotarGato", userController.adotar)

export default routes;