import makeDb from '../../../__test__/fixtures/db'
import makeRemoveCategory from './remove-category'
import makeCategoriesDb from '../data-access/categories-db'
import makeFakeCategory from '../../../__test__/fixtures/category'
// ---
import { jwt, verifyInfo } from '../../_helpers'

describe('remove category', () => {
  let token
  function makeToken () {
    token = jwt.sign({ username: jwt.admin() }, jwt.secret(), jwt.options())
  }
  function patchedToken (data) {
    return {
      authInfo: token,
      ...data
    }
  }

  let categoriesDb
  let removeCategory
  beforeAll(() => {
    makeToken()
    categoriesDb = makeCategoriesDb({ makeDb })
    removeCategory = makeRemoveCategory({ categoriesDb, verifyInfo })
  })

  it('数据必须包含 id 属性', () => {
    const category = makeFakeCategory({ id: undefined })
    expect(removeCategory(patchedToken(category))).rejects.toThrow('id 属性不能忽略')
  })

  it('处理不存在的分类', async () => {
    const fakeCategory = makeFakeCategory()
    const expected = {
      deletedCount: 0,
      message: '分类未找到，数据库无变化'
    }
    const actual = await removeCategory(patchedToken(fakeCategory))
    expect(actual).toEqual(expected)
  })

  it('处理存在的分类，若存在，嵌套删除子分类', async () => {
    const parentCategory = makeFakeCategory()
    await categoriesDb.insert(parentCategory)

    let childCategory = makeFakeCategory({ parent: parentCategory.id })
    await categoriesDb.insert(childCategory)
    childCategory = makeFakeCategory({ parent: parentCategory.id })
    await categoriesDb.insert(childCategory)

    const found = await categoriesDb.findById(childCategory)
    expect(found).toEqual(childCategory)

    const expected = {
      deletedCount: 3,
      message: '分类已删除'
    }

    const actual = await removeCategory(patchedToken(parentCategory))
    expect(actual).toEqual(expected)

    const notFound = await categoriesDb.findById(childCategory)
    expect(notFound).toBe(null)
  })
})
