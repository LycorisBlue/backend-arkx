'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Restaurant.init({
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    adresse: DataTypes.STRING,
    description: DataTypes.TEXT,
    numero: DataTypes.STRING,
    email: DataTypes.STRING,
    heure_ouverture: DataTypes.STRING,
    heure_fermeture: DataTypes.STRING,
    localisation: DataTypes.STRING,
    enable: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};