const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const FootballPlayer = sequelize.define('footballplayer', {
        idPlayer: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          firstName: {
            type: DataTypes.STRING(50),
            allowNull: true
          },
          name: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
          },
          size: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          nationality: {
            type: DataTypes.STRING(40),
            allowNull: false
          },
          gamesPlayedForCountry: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          goalsScoredForCountry: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          grade: {
            type: DataTypes.INTEGER,
            allowNull: false
          }
        }, {
          tableName: 'footballplayer',
          timestamps: false, 
        });

module.exports = FootballPlayer;