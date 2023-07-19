const sequelize = require('../db/sequelize');
const { Op } = require('sequelize');
const { FootballPlayer, Career, Club, Position } = require('../models/associations')

module.exports = (app) => {
    app.get('/api/getNewFootballPlayer/:idGameSession', async (req, res) => {
        const fb = await FootballPlayer.findOne({
            include: [
                {
                  model: Career,
                  as: 'years',
                  include: [Club],
                },
                {
                  model: Position,
                  as: 'positions',
                },
              ],
            where: {
                idPlayer: {
                    [Op.lt]: 772,
                    [Op.notIn]: sequelize.literal(
                        `(SELECT idPlayer FROM footballplayersession WHERE idGameSession = ${req.params.idGameSession})`
                    )
                }
            },
            order: sequelize.random()
          });
        res.json(fb)
    })
}