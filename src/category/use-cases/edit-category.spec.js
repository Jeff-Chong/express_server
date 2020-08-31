import makeDb from '../../../__test__/fixtures/db'
import makeEditCategory from './edit-category'
import makeCategoriesDb from '../data-access/categories-db'
import makeFakeCategory from '../../../__test__/fixtures/category'
// ---
import { jwt, verifyInfo } from '../../_helpers'

describe('edit category', () => {
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
  let editCategory
  beforeAll(() => {
    makeToken()
    categoriesDb = makeCategoriesDb({ makeDb })
    editCategory = makeEditCategory({ categoriesDb, verifyInfo })
  })

  it('数据必须包含 id 属性', () => {
    const category = makeFakeCategory({ id: undefined })
    expect(editCategory(patchedToken(category))).rejects.toThrow('id 属性不能忽略')
  })

  it('数据库查询无果将抛出异常', () => {
    const category = makeFakeCategory()
    return expect(editCategory(patchedToken(category))).rejects.toThrow('分类未找到')
  })
})
