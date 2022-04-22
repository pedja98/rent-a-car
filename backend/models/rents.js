'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { as: 'user', foreignKey: 'username' });
      //this.belongsTo(models.Cars, { as: 'car', foreignKey: 'plate_num' });
    }
  };
  Rents.init({
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date_of_renting: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cancelled: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,

    },
    plate_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    date_of_return: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Rents',
  });
  return Rents;
};