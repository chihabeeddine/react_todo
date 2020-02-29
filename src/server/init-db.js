import { defaultState } from "./defaultState";
import { connectDB } from "./connect-db";

async function initDB() {
    try {
        let db = await connectDB()
        for (const collectionName in defaultState) {
            if (defaultState.hasOwnProperty(collectionName)) {
                let collection = db.collection(collectionName)
                await collection.insertMany(defaultState[collectionName])

            }
        }

    } catch (error) {
        console.error(error)
    }
}

initDB();