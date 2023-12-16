import { Router } from "express";
import admController from "../controllers/admController.js";

const routes = new Router();

routes
  .get("/solicitacoes", admController.getSolicitacoes)

  .post("/aceitarSolicitacao/:id", admController.aceitarSolicitacao)

  .put("/negarSolicitacao/:id", admController.negarSolicitacao);

export default routes;
