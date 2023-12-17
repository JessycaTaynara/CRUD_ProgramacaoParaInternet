import { Router } from "express";
import gatoController from "../controllers/gatoController.js";
import { checkrole } from "../middleware/checkrole.js";

const routes = new Router();

routes
  .post("/addGato", checkrole(["adm"]), gatoController.addGato)
  .get("/gatos", checkrole(["adm", "comum"]), gatoController.getGatosParaAdotar)

  .delete("/deletarGato/:id", checkrole(["adm"]), gatoController.excluirGato)
  .delete("/deletarAdocao/:id", checkrole(["adm"]), gatoController.deletarAdocao)

  .put("/atualizarGato", checkrole(["adm"]), gatoController.editarGato);

export default routes;
