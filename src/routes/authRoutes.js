import { Router } from "express";
import authController from "../controllers/auth.Controller.js";

const routes = new Router()

routes.post("/login", authController.login)

export default routes