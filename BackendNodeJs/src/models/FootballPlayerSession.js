const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const FootballPlayerSession = sequelize.define('footballplayersession', {
    idFootballPlayerSession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idPlayer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idGameSession: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'footballplayersession',
    timestamps: false
  });
  
  module.exports = FootballPlayerSession;