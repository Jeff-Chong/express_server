import makeDb from '../../../__test__/fixtures/db'
import makeAddCategory from './add-category'
import makeCategoriesDb from '../data-access/categories-db'
import makeFakeCategory from '../../../__test__/fixtures/category'
// ---
import { jwt, verifyInfo } from '../../_helpers'

describe('add category', () => {
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
  let addCategory
  beforeAll(() => {
    makeToken()
    categoriesDb = makeCategoriesDb({ makeDb })
    addCategory = makeAddCategory({ categoriesDb, verifyInfo })
  })

  it('需要提供验证信息', () => {
    const newCategory = makeFakeCategory()
    return expect(addCategory({ authInfo: undefined, ...newCategory })).rejects.toThrow('请携带验证信息')
  })

  it('需要提供有效验证信息', () => {
    const newCategory = makeFakeCategory()
    return expect(addCategory({ authInfo: 'abcdefg', ...newCategory })).rejects.toThrow('请携带有效验证信息')
  })

  it('只有 admin 用户才可以操作', () => {
    const token = jwt.sign({ username: 'other' }, jwt.secret(), jwt.options())
    const newCategory = makeFakeCategory()
    return expect(addCategory({ authInfo: token, ...newCategory })).rejects.toThrow('您不具备此操作')
  })

  it('添加 category 信息入数据库，如果 name 已在数据库抛出错误', async () => {
    const newCategory = makeFakeCategory()
    const inserted = await addCategory(patchedToken(newCategory))

    expect(inserted).toMatchObject(newCategory)

    try {
      await addCategory(patchedToken(newCategory))
    } catch (e) {
      expect(e.message).toBe('当前分类已经存在数据库')
    }

    const childCategory = makeFakeCategory({ parent: newCategory.id })
    const childInserted = await addCategory(patchedToken(childCategory))
    expect(childInserted).toMatchObject(childCategory)
  })
})
