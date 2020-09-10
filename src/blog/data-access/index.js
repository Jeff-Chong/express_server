import makeBlogsDb from './blogs-db'
import buildMakeDb from '../../db/mongoDb'
import { BLOGS_DB_URL, BLOGS_DB_NAME } from '../../_helpers'

const collectionName = 'blogs'

export const makeDb = buildMakeDb({
  dbUrl: BLOGS_DB_URL,
  dbName: BLOGS_DB_NAME
})

;(async function setupDb () {
  console.log('Setting up blogs database...')
  const db = await makeDb()
  await db
    .collection(collectionName)
    .createIndexes([
      { key: { title: 1 }, name: 'title_idx' }
    ])
  console.log('Blogs database setup complete...')
})()

const blogsDb = makeBlogsDb({ makeDb, collectionName })
export default blogsDb
