import CadastroUserController from "../controllers/cadastroUserController.js";
import { Router } from "express";

const routes = Router()

routes.post("/cadastrarUsuarioComum", CadastroUserController.cadastrarUser)

export default routes