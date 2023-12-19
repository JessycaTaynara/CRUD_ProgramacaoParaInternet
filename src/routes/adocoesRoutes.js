import { Router } from "express";
import { checkrole } from "../middleware/checkrole.js";
import adocaoController from "../controllers/adocaoController.js";

const routes = new Router();

routes
  .get("/adocoes", checkrole(["adm"]), adocaoController.getAdocoes)

  .post("/adotarGato", checkrole(["comum"]), adocaoController.adotar);

export default routes;
