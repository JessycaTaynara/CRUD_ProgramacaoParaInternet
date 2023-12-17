import { Router } from "express";
import gatoController from "../controllers/gatoController.js";

const routes = new Router();

routes
  .post("/addGato", gatoController.addGato)
  .get("/gatos", gatoController.getGatosParaAdotar)

  .delete("/deletarGato/:id", gatoController.excluirGato)
  .delete("/deletarAdocao/:id", gatoController.deletarAdocao)

  .put("/atualizarGato", gatoController.editarGato);

export default routes;
