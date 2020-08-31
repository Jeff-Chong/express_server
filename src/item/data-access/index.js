import makeItemsDb from './items-db'
import buildMakeDb from '../../db/mongoDb'
import { ITEMS_DB_URL, ITEMS_DB_NAME } from '../../_helpers'

export const makeDb = buildMakeDb({
  dbUrl: ITEMS_DB_URL,
  dbName: ITEMS_DB_NAME
})

;(async function setupDb () {
  console.log('Setting up item database...')
  const db = await makeDb()
  await db
    .collection('items')
    .createIndexes([
      { key: { name: 1 }, name: 'name_idx' }
    ])
  console.log('Item database setup complete...')
})()

const itemsDb = makeItemsDb({ makeDb })
export default itemsDb
