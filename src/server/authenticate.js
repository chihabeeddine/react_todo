import { v4 as uuid } from 'uuid'
import md5 from 'md5'
import { assembleUserState } from './utility';
import { connectDB } from "./connect-db";

const authenticationTokens = []

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
    app.post('/user/create', async (req, res) => {
        let { username, password } = req.body;
        console.log(username, password);
        let db = await connectDB();
        let collection = db.collection(`users`);
        let user = await collection.findOne({ name: username });
        if (user) {
            res.status(500).send({ message: "A user with that account name already exists." });
            return;
        };

        let userID = uuid();
        let groupID = uuid();

        await collection.insertOne({
            name: username,
            id: userID,
            passwordHash: md5(password)
        });

        await db.collection(`groups`).insertOne({
            id: groupID,
            owner: userID,
            name: `To Do`
        });

        let state = await assembleUserState({ id: userID, name: username });

        res.status(200).send({ userID, state });
    });
}