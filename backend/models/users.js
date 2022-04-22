'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasMany(modes.Rents, {as: 'rents', foreignKey: 'username'})
    }
  };
  Users.init({
    username: {
      type: DataTypes.STRING(80),
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Users',
  });
  return Users;
};