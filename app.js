import express from "express";
import cors from "cors";
import usuario from "./src/routes/userRoutes.js";
import gato from "./src/routes/gatoRoutes.js";
import login from "./src/routes/authRoutes.js";
import administrador from "./src/routes/admRoutes.js";

const app = express();

app.use(cors("*"), express.json(), usuario, gato, login, administrador);

app.listen(3000, () => {
  console.log("Api rodando");
});
