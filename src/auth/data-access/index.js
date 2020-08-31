import makeUsersDb from './users-db'
import buildMakeDb from '../../db/mongoDb'
import { USERS_DB_URL, USERS_DB_NAME } from '../../_helpers'

export const makeDb = buildMakeDb({
  dbUrl: USERS_DB_URL,
  dbName: USERS_DB_NAME
})

;(async function setupDb () {
  console.log('Setting up user database...')
  const db = await makeDb()
  await db
    .collection('users')
    .createIndexes([
      { key: { username: 1 }, name: 'username_idx' }
    ])
  console.log('User database setup complete...')
})()

const usersDb = makeUsersDb({ makeDb })
export default usersDb
