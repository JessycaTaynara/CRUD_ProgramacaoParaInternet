import { Router } from "express";
import loginController from "../controllers/loginController.js";

const routes = new Router();

routes.post("/login", loginController.login);

export default routes;
