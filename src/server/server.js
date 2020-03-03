import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from './connect-db'
import './init-db'
import { authenticationRoute } from './authenticate'
import path from 'path'

let port = process.env.PORT || 7777
let app = express()

app.listen(port, console.log("server up and running  on ", port))
// app.get('/', (req, res) => {
//     res.send("hello there")
// })

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
)

authenticationRoute(app)

if (process.env.NODE_ENV == `production`) {
    app.unsubscribe(express.static(path.resolve(__dirname, `../../dist`)))
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'))
    })
}

export const addNewTask = async task => {
    try {
        let db = await connectDB();
        let collection = db.collection(`tasks`)
        await collection.insertOne(task)
    } catch (error) {
        console.error(error)
    }
}

export const updateTask = async task => {
    try {
        let { id, group, isComplete, name } = task
        let db = await connectDB();
        let collection = db.collection(`tasks`)
        if (group) {
            await collection.updateOne({ id }, { $set: { group } })
        }
        if (name) {
            await collection.updateOne({ id }, { $set: { name } })
        }
        if (isComplete !== undefined) {
            await collection.updateOne({ id }, { $set: { isComplete } })
        }
    } catch (error) {
        console.error(error)
    }
}

app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    const newTemp = await addNewTask(task)
    console.log('newTemp:', newTemp)
    res.status(200).send()
})

app.post('/task/update', async (req, res) => {
    let task = req.body.task;
    const tmp = await updateTask(task)
    console.log('tmp:', tmp)
    res.status(200).send()
})