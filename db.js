const MongoClient = require('mongodb').MongoClient

const config = {
    DB_URL: process.env.DB_URL,
    DB_COLLECTION: process.env.DB_COLLECTION || 'expenses',
    DB_COLLECTION_MISC: process.env.DB_COLLECTION_MISC || 'misc',
}

const client = new MongoClient(config.DB_URL, { useUnifiedTopology: true })
const collections = {}

async function connect() {
    try {
        await client.connect()
        await client.db().command({ ping: 1 })
        console.log('✅ Connected to database ...')
        collections.expenses = client.db().collection(config.DB_COLLECTION)
        collections.misc = client.db().collection(config.DB_COLLECTION_MISC)
        return await client.db()
    } catch (e) {
        console.error(e)
        await disconnect()
    }
}

async function disconnect() {
    await client.close()
    console.log('✅ Disconnected from database ...')
}

function expenses() {
    return collections.expenses
}

function misc() {
    return collections.misc
}

module.exports = {
    connect,
    disconnect,
    expenses,
    misc,
}
