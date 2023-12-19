import { Router } from "express";
import { checkrole } from "../middleware/checkrole.js";
import solicitacoesController from "../controllers/solicitacoesController.js";

const routes = new Router();

routes
    .get("/solicitacoes", checkrole(["adm"]), solicitacoesController.getSolicitacoes)
    .get("/minhasSolicitacoes/:email", checkrole(["comum"]), solicitacoesController.getMinhasSolicitacoes)

    .post("/fazerSolicitacao", checkrole(["comum"]), solicitacoesController.solicitarAdocao)
    .post("/aceitarSolicitacao/:id", checkrole(["adm"]), solicitacoesController.aceitarSolicitacao)

    .put("/negarSolicitacao/:id", checkrole(["adm"]), solicitacoesController.negarSolicitacao);


export default routes