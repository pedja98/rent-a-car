'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasMany(models.Rents, {as: 'rents', foreignKey: 'plate_num'})
    }
  };
  Cars.init({
    plate_num: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },

    brand: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};