const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('footballapp', "root", "root", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(_ => console.log("Connexion"))
    .catch(error => console.error(error))
  
module.exports = sequelize