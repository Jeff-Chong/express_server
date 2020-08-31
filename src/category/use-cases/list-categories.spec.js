import makeDb from '../../../__test__/fixtures/db'
import makeListCategories from './list-categories'
import makeCategoriesDb from '../data-access/categories-db'
import makeFakeCategory from '../../../__test__/fixtures/category'

describe('list categories', () => {
  let categoriesDb
  beforeAll(() => {
    categoriesDb = makeCategoriesDb({ makeDb })
  })

  it('获取全部分类', async () => {
    const listArticles = makeListCategories({ categoriesDb })
    const inserts = await Promise.all(
      [makeFakeCategory(), makeFakeCategory(), makeFakeCategory()].map(
        categoriesDb.insert
      )
    )
    const found = await listArticles()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })
})
