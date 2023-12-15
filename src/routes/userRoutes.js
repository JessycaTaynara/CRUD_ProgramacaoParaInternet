import { Router } from "express";
import userController from "../controllers/userController.js";

const routes = new Router();

routes
  .get("/", userController.show)

  .post("/users", userController.createUser)
  .post("/adotarGato", userController.adotar)

  .delete("/deletarUser/:email", userController.remove);

export default routes;
