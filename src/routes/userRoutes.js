import { Router } from "express";
import userController from "../controllers/userController.js";

const routes = new Router();

routes
  .get("/usuarios", userController.show)
  .get("/minhasAdocoes/:email", userController.getMeusGatosAdotados)
  .get("/minhasSolicitacoes/:email", userController.getMinhasSolicitacoes)

  .post("/users", userController.createUser)
  .post("/adotarGato", userController.adotar)
  .post("/fazerSolicitacao", userController.solicitarAdocao)

  .delete("/deletarUser/:email", userController.remove);

export default routes;
