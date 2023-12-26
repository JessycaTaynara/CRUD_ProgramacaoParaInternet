import gatoModel from "../models/gatoModel.js";

class gatoController {
  async addGato(req, res) {
    const { nome, idade, sexo, raca, cor, descricao } = req.body;
    try {
      await gatoModel.adicionarGato(nome, idade, sexo, raca, cor, descricao);
      res.status(200).send({ message: "Gato adicionado" });
    } catch (error) {
      res.status(500).send({ message: `Erro ao adicionar um gato - ${error}` });
    }
  }
  async getGatosParaAdotar(req, res) {
    try {
      const gatos = await gatoModel.getGatosParaAdocao();
      res.status(200).send(gatos);
    } catch (error) {
      res.status(404).send({ message: `Erro ao listar gatos - ${error}` });
    }
  }
  async excluirGato(req, res) {
    const id = req.params.id;

    try {
      await gatoModel.deleteGato(id);
      res.status(200).send({ message: "Gato excluido" });
    } catch (error) {
      res.status(404).send({ message: `Erro ao deletar gato - ${error}` });
    }
  }
  async deletarAdocao(req, res) {
    const id = req.params.id;
    try {
      await gatoModel.deletarAdocao(id);
      res.status(200).send({ message: "adocao excluida" });
    } catch (error) {
      res.status(404).send({ message: `Erro ao deletar adocao - ${error}` });
    }
  }
  async gatoPorId(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).send({ message: "ID do gato não identificado" });
      }

      const gato = await gatoModel.getGatoPorId(id);

      if (!gato) {
        return res.status(404).send({ message: "Gato não encontrado" });
      }

      return res.status(200).json(gato);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao buscar gato - ${error}` });
    }
  }
  async editar(req, res) {
    const { nome, raca, cor, descricao, sexo, id } = req.body;

    if (!nome) {
      return res.status(400).send({ message: "Informe o nome do gato" });
    } else if (!raca) {
      return res.status(400).send({ message: "Informe a raça do gato" });
    } else if (!cor) {
      return res.status(400).send({ message: "Informe a cor do gato" });
    } else if (!descricao) {
      return res
        .status(400)
        .send({ message: "é necessário uma pequena descrição para o gato" });
    } else if (!sexo) {
      return res.status(400).send({ message: "Informe o sexo do gato" });
    }

    try {
      const gatoAtualizado = await gatoModel.update(
        nome,
        sexo,
        raca,
        cor,
        descricao,
        id
      );
      if (!gatoAtualizado) {
        return res
          .status(404)
          .send({ message: "Gato não encontrado no sistema" });
      }
      return res.status(200).json(gatoAtualizado);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao atualizar gato - ${error}` });
    }
  }
}

export default new gatoController();
