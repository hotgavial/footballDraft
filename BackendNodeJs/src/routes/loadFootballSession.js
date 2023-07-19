const sequelize = require('../db/sequelize');
const { Op } = require('sequelize');
const { FootballPlayer, Position, FootballPlayerSession } = require('../models/associations')

module.exports = (app) => {
    app.get('/api/loadFootballSession/:idGameSession', async (req, res) => {
        const session = await FootballPlayerSession.findAll({
            include: [
                {
                  model: FootballPlayer,
                  include: [
                    {
                        model: Position,
                        as: 'positions'
                    }      
                  ]
                },
              ],
            where: {
               idGameSession: req.params.idGameSession,
               idUser: {
                    [Op.ne]: null,
                    [Op.ne]: 6
               }
            }
          });
        let footballPlayers = [];
        session.forEach((sessionItem) => {
            let footballplayer = {
                idPlayer : sessionItem.idPlayer,
                firstName: sessionItem.footballplayer.firstName,
                name: sessionItem.footballplayer.name,
                grade: sessionItem.footballplayer.grade,
                owner: sessionItem.idUser,
                positions: sessionItem.footballplayer.positions.map((item) => item.position)
            }
            footballPlayers.push(footballplayer)
          });
        res.json(footballPlayers)
    })
}