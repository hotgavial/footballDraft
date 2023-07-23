const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port = 3000

app
    .use(bodyParser.json())
    .use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      }));

require('./src/routes/getNewFootballPlayer')(app)   
require('./src/routes/loadFootballSession')(app)
require('./src/routes/getCurrentUsers')(app)
require('./src/routes/updateFootballPlayerSession')(app)

app.listen(port, () => console.log(`Application started on http://localhost:${port}`))