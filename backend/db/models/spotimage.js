'use strict';
const {
  Model
} = require('sequelize');
// const {Spot} = require('./spot');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {model: Spot, key: 'id'},
      allowNull: false,
      onDelete: 'CASCADE'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};