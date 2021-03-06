//import sequelize
var sequelize = require("../config/db.config");
// import model
var Filmes = require("../models/Filmes.model");
var Generos = require("../models/Generos.model");

const controller = {};
const { Op } = require("sequelize");

sequelize.sync();

controller.CreateGeneroTESTDATA = async (req, res) => {
  // Criar um Genero teste
  const genero = {
    DescricaoGenero: "Ação",
  };
  // Guardar Genero na base de dados
  Generos.create(genero)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro na criacao de 'generos'.",
      });
    });
};

controller.CreateFilmeTESTDATA = async (req, res) => {
  // Criar um Filme teste
  const filme = {
    DescricaoFilme: "Um filme com ação incrível!",
    titulo: "Die Hard",
    foto: "Die_Hard.jpg",
    generoId: 4,
  };
  // Guardar Filme na base de dados
  Filmes.create(filme)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro na criacao de 'Filmes'.",
      });
    });
};

controller.genero = async (req, res) => {
  // Criar um Genero
  const genero = {
    DescricaoGenero: req.body.DescricaoGenero,
  };
  // Guardar Genero na base de dados
  Generos.create(genero)
    .then((data) => {
      res.json({ success: true, message: "Género Criado", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro na criacao de 'generos'.",
      });
    });
};

controller.create = async (req, res) => {
  // Validar request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Insira um titulo!",
    });
    return;
  }
  // Criar um Filme
  const filme = {
    DescricaoFilme: req.body.DescricaoFilme,
    titulo: req.body.titulo,
    foto: req.body.foto,
    generoId: req.body.generoId,
  };
  // Guardar Filme na base de dados
  Filmes.create(filme)
    .then((data) => {
      res.json({ success: true, message: "Filme Registado", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro na criacao de 'Filmes'.",
      });
    });
};

controller.list = async (req, res) => {
  Filmes.findAll({ include: [Generos], order: [["idFilme", "ASC"]] })
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving 'Filmes'.",
      });
    });
};

controller.listGeneros = async (req, res) => {
  Generos.findAll()
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving 'Filmes'.",
      });
    });
};

controller.get = async (req, res) => {
  const id = req.params.id;

  // Validar request
  if (id == ":id") {
    res.status(400).send({
      message: "Insira um id!",
    });
    return;
  }

  Filmes.findByPk(id, { include: [Generos] })
    .then((data) => {
      if (data) {
        res.json({ success: true, data: data });
      } else {
        res.status(404).send({
          message: "Nao foi possivel encontrar o Filme com o id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao procurar o Filme com o id=" + id,
      });
    });
};

controller.update = async (req, res) => {
  const id = req.params.id;

  await Filmes.update(req.body, {
    where: { idFilme: id },
  })
    .then((data) => {
      if (data == 1) {
        res.json({
          success: true,
          message: "O Filme com o id=" + id + " foi atualizado com sucesso!",
          data: data,
        });
      } else {
        res.json({
          message:
            "Não foi possivel atualizar o Filme com o id=" +
            id +
            ". Talvez 'Filmes' não foi encontrado ou req.body está vazio!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel atualizar o Filme com o id=" + id,
      });
    });
};

controller.delete = async (req, res) => {
  const id = req.params.id;

  await Filmes.destroy({
    where: { idFilme: id },
  })
    .then((data) => {
      if (data == 1) {
        res.json({
          data: data,
          success: true,
          message: "O Filme com o id=" + id + " foi eliminado com sucesso!",
        });
      } else {
        res.json({
          message:
            "Não foi possivel eliminar o Filme com o id=" +
            id +
            ". Talvez 'Filmes' não foi encontrado ou id=" +
            id +
            " não existe!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel eliminar o Filme com o id=" + id,
      });
    });
};

controller.deleteAll = async (req, res) => {
  Filmes.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: nums + "Filmes were deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro na eliminacao de todos os Filmes.",
      });
    });
};

controller.deleteGenero = async (req, res) => {
  const id = req.params.id;

  // Validar request
  if (id == ":id") {
    res.status(400).send({
      message: "Insira um id!",
    });
    return;
  }

  Generos.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "O Genero com o id=" + id + " foi eliminado com sucesso!",
        });
      } else {
        res.send({
          message:
            "Não foi possivel eliminar o Genero com o id=" +
            id +
            ". Talvez 'generos' não foi encontrado ou id=" +
            id +
            " não existe!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel eliminar o Genero com o id=" + id,
      });
    });
};

module.exports = controller;
