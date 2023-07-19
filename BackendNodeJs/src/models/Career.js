const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize')

const Career = sequelize.define('career', {
        idCareer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        idPlayer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        idClub: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        firstYear: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        lastYear: {
        type: DataTypes.INTEGER,
        allowNull: true
        }
    }, {
        // Spécifiez le nom de la table existante ici
        tableName: 'career',
        timestamps: false // Si vous ne souhaitez pas utiliser les champs createdAt et updatedAt
    });

module.exports = Career;