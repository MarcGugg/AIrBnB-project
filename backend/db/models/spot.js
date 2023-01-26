'use strict';

const {
  Model
} = require('sequelize');
// const { User } = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    async avgRating() {
      const reviews = await this.getReviews()
      let starsArr = []
      
      for (let i = 0; i < reviews.length; i++) {
        starsArr.push(reviews[i].stars)
      }

      let sum = 0
      for (let i = 0; i < starsArr.length; i++) {
        sum += starsArr[i]
      }

      return sum / starsArr.length

    }
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.belongsToMany(models.User, {
        through: 'Booking',
        otherKey: 'userId',
        foreignKey: 'spotId',
        as: 'user_from_booking'
      })
      Spot.belongsToMany(models.User, {
        through: 'Review',
        otherKey: 'userId',
        foreignKey: 'spotId',
        as: 'user_from_review'
      })
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      references: {model: 'Users', key: 'id'},
      allowNull: false,
      onDelete: 'CASCADE'
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      validate: {
        valid(val) {
          let withoutDeci = Math.floor(val)
          if (withoutDeci < -90 || withoutDeci > 90) {
            throw new Error('Latitude is not valid')
          }
        }
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      validate: {
        valid(val) {
          let withoutDeci = Math.floor(val)
          if (withoutDeci < -180 || withoutDeci > 180) {
            throw new Error('Longitutde is not valid')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        lessThan50chars(val) {
          if (val.length > 50) {
            throw new Error('Name must be less than 50 characters')
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};