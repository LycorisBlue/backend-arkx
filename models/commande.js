'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Commande.init({
    content: DataTypes.JSON,
    date_heure_cmd: DataTypes.DATE,
    statut: DataTypes.STRING,
    total: DataTypes.INTEGER,
    delete: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Commande',
  });
  return Commande;
};