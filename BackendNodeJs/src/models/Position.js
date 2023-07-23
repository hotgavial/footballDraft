const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const Position = sequelize.define('position', {
    idPosition: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idPlayer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    // Spécifiez le nom de la table existante ici
    tableName: 'position',
    timestamps: false // Si vous ne souhaitez pas utiliser les champs createdAt et updatedAt
  });

  module.exports = Position;

  
  