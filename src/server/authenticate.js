import { v4 as uuid } from 'uuid'
import md5 from 'md5'

import { connectDB } from "./connect-db";

const authenticationTokens = []

async function assembleUserState(user) {
    try {

        const db = await connectDB();

        const tasks = await db.collection(`tasks`).find({ owner: user.id }).toArray();
        const groups = await db.collection(`groups`).find({ owner: user.id }).toArray()

        return {
            tasks,
            groups,
            session: { authenticated: `AUTHENTICATED`, id: user.id }
        }
    } catch (error) {
        console.error(error)
    }
}

export const authenticationRoute = app => {
    app.post('/authenticate', async (req, res) => {
        try {
            let { username, password } = req.body;

            const db = await connectDB();
            const collection = db.collection(`users`);


            const user = await collection.findOne({ name: username })

            if (!user) return res.status(404).send('Login incorrect')

            const hash = md5(password)

            if (hash !== user.passwordHash) return res.status(400).send('Login incorrect')

            const token = uuid();

            authenticationTokens.push({
                token,
                userID: user.id
            })

            let state = await assembleUserState(user)

            res.status(200).send({ token, state })

        } catch (error) {
            console.error(error)
        }

    })
}