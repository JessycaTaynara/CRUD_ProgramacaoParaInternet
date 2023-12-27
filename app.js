import express from "express";
import cors from "cors";
import usuario from "./src/routes/userRoutes.js";
import gato from "./src/routes/gatoRoutes.js";
import login from "./src/routes/authRoutes.js";
import administrador from "./src/routes/admRoutes.js";
import authMiddleware from "./src/middleware/auth.middleware.js";
import solicitacoes from "./src/routes/solicitacoesRoutes.js";
import adocoes from "./src/routes/adocoesRoutes.js";

const app = express();

app.use(
  cors("*"),
  express.json(),
  login,
  authMiddleware,
  usuario,
  gato,
  administrador,
  solicitacoes,
  adocoes
);

app.listen(3000, () => {
  console.log("Api rodando");
});
