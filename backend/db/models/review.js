'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'}),
      Review.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {model: Spot, key: 'id'},
      allowNull: false,
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
      allowNull: false,
      onDelete: 'CASCADE'
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};