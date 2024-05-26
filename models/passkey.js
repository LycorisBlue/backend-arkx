'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PassKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PassKey.init({
    key: DataTypes.STRING,
    statut: DataTypes.INTEGER,
    enable: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PassKey',
  });
  return PassKey;
};