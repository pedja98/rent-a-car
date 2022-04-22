'use strict';

const Users = require('./users');
const Cars = require('./cars');
const Rents = require('./rents');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Cars = Cars(db.sequelize, db.Sequelize);
db.Users = Users(db.sequelize, db.Sequelize);
db.Rents = Rents(db.sequelize, db.Sequelize);

db.Cars.hasMany(db.Rents, {as: 'rents', foreignKey: 'plate_num'})

db.Rents.belongsTo(db.Users, { as: 'user', foreignKey: 'username' });
db.Rents.belongsTo(db.Cars, { as: 'car', foreignKey: 'plate_num' });

db.Users.hasMany(db.Rents, {as: 'rents', foreignKey: 'username'})

module.exports = db;
