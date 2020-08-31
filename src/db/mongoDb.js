import mongodb from 'mongodb'

const clientStorage = new Map()
const MongoClient = mongodb.MongoClient

export default function buildMakeDb ({ dbUrl, dbName }) {
  let dbClient
  if (clientStorage.has(dbUrl)) {
    dbClient = clientStorage.get(dbUrl)
  } else {
    dbClient = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    clientStorage.set(dbUrl, dbClient)
  }
  return async function makeDb () {
    if (!dbClient.isConnected()) {
      await dbClient.connect()
    }
    return dbClient.db(dbName)
  }
}
