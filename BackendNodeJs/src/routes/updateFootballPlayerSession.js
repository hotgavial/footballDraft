const { FootballPlayerSession } = require('../models/associations')


module.exports = (app) => {
    app.post('/api/updateFootballPlayerSession', async (req, res) => {
        console.log('on est bien ici')
        console.log(req.body)
       try {
            const { idUser, idPlayer } = req.body;
            console.log(idPlayer)
            const newFootballerPlayerSession = await FootballPlayerSession.create({
                idUser: idUser,
                idPlayer: idPlayer,
                idGameSession: 1
            });
            res.json(newFootballerPlayerSession);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occured on update' });
        }
    });
}