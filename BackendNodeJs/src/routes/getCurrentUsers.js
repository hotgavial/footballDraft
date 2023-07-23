const { User, UserSession } = require('../models/associations')

module.exports = (app) => {
    app.get('/api/getCurrentUsers/:idGameSession', async (req, res) => {
        const users = await User.findAll({
            include: [
                {
                  model: UserSession,
                  where: {
                    idGameSession: req.params.idGameSession
                  }
                },
              ],

          });
          let formatedUsers = [];
          users.forEach((user) => {
            let formatedUser = {
                id : user.idUser,
                pseudo: user.pseudo,
                score: 0,
                ranking: 1,
                nbrFbPlayers: 0,
                listCompoUser: []
            }
            formatedUsers.push(formatedUser)
          });
        res.json(formatedUsers)
    })
}