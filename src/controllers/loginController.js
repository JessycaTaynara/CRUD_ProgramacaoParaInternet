import authModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

class authController {
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await authModel.login(email, senha);

      if (!user) {
        return res
          .status(404)
          .send({ message: "Dados incorretos ou sem cadastro" });
      }

      const token = jwt.sign(
        { email: user.email, nome: user.nome, tipo: user.tipo },
        "jessyca",
        { expiresIn: "1h" }
      );
      return res.status(200).send({ token: token });
    } catch (error) {
      return res.status(404).send({ message: `Erro ao logar - ${error}` });
    }
  }
}
export default new authController();
