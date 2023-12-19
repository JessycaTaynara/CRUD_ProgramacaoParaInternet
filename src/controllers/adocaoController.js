import adocaoModel from "../models/adocoesModel";
import gatoModel from "../models/gatoModel";
import userModel from "../models/userModel";

class AdocaoController {
  async getAdocoes(req, res) {
    try {
      const adocoes = await adocaoModel.getAdocoes();

      if (!adocoes) {
        return res.status(404).send({ message: "Nenhuma adoção encontrada" });
      }

      const listaDeAdocoes = [];

      for (let adocao of adocoes) {
        const dono = userModel.userPorId(adocao.email_usuario);

        if (!dono) {
          return res.status(404).send({ message: `Dono não encontrado` });
        }

        const gato = gatoModel.getGatoPorId(adocao.id_gato);

        if (!gato) {
          return res
            .status(404)
            .send({ message: `Gato de id ${adocao.id_gato} não encontrado` });
        }

        listaDeAdocoes.push({ dono: dono.nome, gato: gato });
      }

      return res.status(200).json(listaDeAdocoes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao buscar adoções - ${error}` });
    }
  }
  async adotar(req, res) {
    const { idGato, emailDono } = req.body;
    try {
      await adocaoModel.fazerAdocao(idGato, emailDono);
      res.status(200).send({ message: `Gato ${idGato} adotado!` });
    } catch (error) {
      res.status(500).send({ message: `Erro ao adotar - ${error}` });
    }
  }
  async getMeusGatosAdotados(req, res) {
    const emailDono = req.params.email;
    try {
      const adocoes = await adocaoModel.getMinhasAdocoes(emailDono);

      if (adocoes.length == 0) {
        return res.status(500).send({ message: "Você não adotou nenhum gato" });
      }

      const listaGatos = [];

      for (let adocao of adocoes) {
        const dadosDoGato = await gatoModel.getGatoPorId(adocao.gato.id);
        listaGatos.push(dadosDoGato);
      }

      return res.status(200).send(listaGatos);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao buscar seus gatos adotados - ${error}` });
    }
  }
}

export default new AdocaoController();
