const { DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize')

const GameSession = sequelize.define('GameSession', {
    idGameSession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    numTour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gamePaused: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'gamesession',
    timestamps: false
  });
  
  module.exports = GameSession;