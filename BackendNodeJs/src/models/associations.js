const Position = require('./position')
const FootballPlayer = require('./footballplayer')
const Career = require('./career')
const Club = require('./club')
const FootballPlayerSession = require('./footballplayersession')
const User = require('./user')
const GameSession = require('./gamesession')
const UserSession = require('./usersession')

FootballPlayer.hasMany(Position, {
        foreignKey: 'idPlayer', // La clé étrangère dans la table Position
        as: 'positions', // Alias pour la relation (facultatif, vous pouvez utiliser ce nom pour les requêtes)
    });

FootballPlayer.hasMany(Career, {
    foreignKey: 'idPlayer',
    as: 'years'
})

FootballPlayer.hasMany(FootballPlayerSession, {foreignKey: 'idPlayer'})

Career.belongsTo(Club, { foreignKey: 'idClub' });

Club.hasMany(Career, {foreignKey:'idClub'})

FootballPlayerSession.belongsTo(FootballPlayer, {foreignKey: 'idPlayer'})

User.hasMany(UserSession, {foreignKey: 'idUser'})

module.exports = { FootballPlayer, Career, Club, Position, FootballPlayerSession, User, GameSession, UserSession };