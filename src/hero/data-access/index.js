import makeHeroesDb from './heroes-db'
import buildMakeDb from '../../db/mongoDb'
import { HEROES_DB_URL, HEROES_DB_NAME } from '../../_helpers'

export const makeDb = buildMakeDb({
  dbUrl: HEROES_DB_URL,
  dbName: HEROES_DB_NAME
})

;(async function setupDb () {
  console.log('Setting up hero database...')
  const db = await makeDb()
  await db
    .collection('heros')
    .createIndexes([
      { key: { name: 1 }, name: 'name_idx' }
    ])
  console.log('Hero database setup complete...')
})()

const heroesDb = makeHeroesDb({ makeDb })
export default heroesDb
