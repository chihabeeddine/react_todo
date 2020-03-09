

import { connectDB } from '../connect-db'


exports.addNewTask = async function (req, res) {
    try {

        if (!req.body.task) return res.status(400).send({ code: 'BAD_REQUEST' })
        const task = req.body.task;

        let db = await connectDB();
        let collection = db.collection(`tasks`)
        await collection.insertOne(task)

        res.status(200).send(collection)

    } catch (error) {
        console.error(error)
        return res.status(400).send({ code: 'BAD_REQUEST' })

    }
}



exports.updateTask = async function (req, res) {
    try {
        if (!req.body.task) return res.status(400).send({ code: 'BAD_REQUEST' })
        const task = req.body.task;

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
        res.status(200).send(collection)

    } catch (error) {
        console.error(error)
        return res.status(400).send({ code: 'BAD_REQUEST' })
    }
}