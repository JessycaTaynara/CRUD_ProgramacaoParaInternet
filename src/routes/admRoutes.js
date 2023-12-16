import { Router } from "express";
import admController from "../controllers/admController.js";

const routes = new Router();

routes.get("/solicitacoes", admController.getSolicitacoes);
export default routes;
