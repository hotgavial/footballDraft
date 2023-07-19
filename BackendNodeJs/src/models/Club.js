const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize')

const Club = sequelize.define('club', {
        idClub: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        club: {
        type: DataTypes.STRING(35),
        allowNull: false
        },
        country: {
        type: DataTypes.STRING(30),
        allowNull: false
        }
    }, {
        // Spécifiez le nom de la table existante ici
        tableName: 'club',
        timestamps: false // Si vous ne souhaitez pas utiliser les champs createdAt et updatedAt
    });

module.exports = Club