const Sequelize = require('sequelize');
const { sequelize } = require('../config/databaseConfig');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
