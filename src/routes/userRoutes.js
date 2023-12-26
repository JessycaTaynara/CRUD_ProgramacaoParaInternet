import { Router } from "express";
import userController from "../controllers/userController.js";
import { checkrole } from "../middleware/checkrole.js";

const routes = new Router();

routes
  .get("/usuarios", checkrole(["adm"]), userController.show)
  .get("/minhasAdocoes/:email", checkrole(["comum"]), userController.getMeusGatosAdotados)
  .get("/minhasSolicitacoes/:email", checkrole(["comum"]), userController.getMinhasSolicitacoes)

  .post("/users", userController.createUser)
  .post("/adotarGato", checkrole(["comum"]), userController.adotar)
  .post("/fazerSolicitacao", checkrole(["comum"]), userController.solicitarAdocao)

  .delete("/deletarUser/:email", checkrole(["comum"]), userController.remove);

export default routes;
