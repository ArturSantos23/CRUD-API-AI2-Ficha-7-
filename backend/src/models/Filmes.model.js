var Sequelize = require("sequelize");
var sequelize = require("../config/db.config");
var Genero = require("./Generos.model");

var Filmes = sequelize.define(
  "filmes",
  {
    idFilme: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DescricaoFilme: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    foto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Filmes.belongsTo(Genero, {
  foreignKey: { name: "generoId", allowNull: false },
});

module.exports = Filmes;
