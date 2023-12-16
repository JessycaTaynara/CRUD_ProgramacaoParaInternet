import authModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

class authController {
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await authModel.login(email, senha);

      if (user.length == 0) {
        return res.status(404).send({ message: "Email ou senha incorretos" });
      }

      const token = jwt.sign({ email: user.email, nome: user.nome }, "jessyca");
      return res.status(200).send({ message: "Logado com sucesso", token });
    } catch (error) {
      return res.status(404).send({ message: `Erro ao logar - ${error}` });
    }
  }
}
export default new authController();
