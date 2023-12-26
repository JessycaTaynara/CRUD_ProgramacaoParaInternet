import { Router } from "express";
import admController from "../controllers/admController.js";
import { checkrole } from "../middleware/checkrole.js";

const routes = new Router();

routes
  .get("/solicitacoes", checkrole(["adm"]), admController.getSolicitacoes)

  .post("/aceitarSolicitacao/:id", checkrole(["adm"]), admController.aceitarSolicitacao)

  .put("/negarSolicitacao/:id", checkrole(["adm"]), admController.negarSolicitacao);

export default routes;
