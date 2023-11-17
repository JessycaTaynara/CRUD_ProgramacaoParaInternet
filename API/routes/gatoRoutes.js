import { Router } from "express";
import gatoController from "../controllers/gatoController.js";

const routes = new Router()

routes
    .post('/addGato', gatoController.addGato)
    .get('/gatos', gatoController.getGatos)

export default routes