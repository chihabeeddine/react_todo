import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import './init-db'
import { authenticationRoute } from './authenticate'
import path from 'path'

import helmet from 'helmet'

let port = process.env.PORT || 7777
let app = express()


// app.get('/', (req, res) => {
//     res.send("hello there")
// })

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    // helmet()
)

authenticationRoute(app)

// if (process.env.NODE_ENV == `production`) {
//     app.unsubscribe(express.static(path.resolve(__dirname, `../../dist`)))
//     app.get('/*', (req, res) => {
//         res.sendFile(path.resolve('index.html'))
//     })
// }



require('./routes/tasks.js')(app)



app.listen(port, () => {
    console.log('Express server listening on %d, in %s mode', port, process.env.NODE_ENV);
})
