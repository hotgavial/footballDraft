const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const UserSession = sequelize.define('UserSession', {
    idUserSession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idGameSession: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderPlayer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hasAgreedNextTurn: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'usersession',
    timestamps: false
  });
  
  module.exports = UserSession;