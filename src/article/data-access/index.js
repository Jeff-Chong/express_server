import makeArticlesDb from './articles-db'
import buildMakeDb from '../../db/mongoDb'
import { ARTICLES_DB_URL, ARTICLES_DB_NAME } from '../../_helpers'

export const makeDb = buildMakeDb({
  dbUrl: ARTICLES_DB_URL,
  dbName: ARTICLES_DB_NAME
})

;(async function setupDb () {
  console.log('Setting up article database...')
  const db = await makeDb()
  await db
    .collection('articles')
    .createIndexes([
      { key: { title: 1 }, name: 'title_idx' }
    ])
  console.log('Article database setup complete...')
})()

const articlesDb = makeArticlesDb({ makeDb })
export default articlesDb
