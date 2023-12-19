import { Router } from "express";
import { checkrole } from "../middleware/checkrole";
import adocaoController from "../controllers/adocaoController";

const routes = new Router();

routes.get("/adocoes", checkrole(["adm"]), adocaoController.getAdocoes);

export default routes;
