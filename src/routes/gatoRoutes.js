import { Router } from "express";
import gatoController from "../controllers/gatoController.js";
import { checkrole } from "../middleware/checkrole.js";

const routes = new Router();

routes
  .get("/gatos", checkrole(["adm", "comum"]), gatoController.getGatosParaAdotar)
  .get("/gatoPorId/:id", checkrole(["adm"]), gatoController.gatoPorId)

  .post("/addGato", checkrole(["adm"]), gatoController.addGato)

  .delete("/deletarGato/:id", checkrole(["adm"]), gatoController.excluirGato)
  .delete("/deletarAdocao/:id", checkrole(["adm"]), gatoController.deletarAdocao)

  .put("/editarGato", checkrole(["adm"]), gatoController.editar);

export default routes;
