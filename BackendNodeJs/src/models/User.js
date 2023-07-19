const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize')


const User = sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pseudo: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
  
  module.exports = User;