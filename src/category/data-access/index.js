import makeCategoriesDb from './categories-db'
import buildMakeDb from '../../db/mongoDb'
import { CATEGORIES_DB_URL, CATEGORIES_DB_NAME } from '../../_helpers'

export const makeDb = buildMakeDb({
  dbUrl: CATEGORIES_DB_URL,
  dbName: CATEGORIES_DB_NAME
})

;(async function setupDb () {
  console.log('Setting up category database...')
  const db = await makeDb()
  await db
    .collection('categories')
    .createIndexes([
      { key: { name: 1 }, name: 'name_idx' }
    ])
  console.log('Category database setup complete...')
})()

const categoriesDb = makeCategoriesDb({ makeDb })
export default categoriesDb
