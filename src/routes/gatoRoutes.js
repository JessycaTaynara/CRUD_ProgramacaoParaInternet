import { Router } from "express";
import gatoController from "../controllers/gatoController.js";

const routes = new Router();

routes
  .post("/addGato", gatoController.addGato)
  .get("/gatos", gatoController.getGatos)

  .delete("/deletarGato", gatoController.excluirGato)
  .delete("/deletarAdocao", gatoController.deletarAdocao)

  .put("/atualizarGato", gatoController.editarGato);
export default routes;
