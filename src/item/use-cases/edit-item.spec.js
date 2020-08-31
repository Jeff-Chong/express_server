import makeDb from '../../../__test__/fixtures/db'
import makeEditItem from './edit-item'
import makeItemsDb from '../data-access/items-db'
import makeFakeItem from '../../../__test__/fixtures/item'
// ---
import { jwt, verifyInfo } from '../../_helpers'

describe('edit item', () => {
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

  let itemsDb
  let editItem
  beforeAll(() => {
    makeToken()
    itemsDb = makeItemsDb({ makeDb })
    editItem = makeEditItem({ itemsDb, verifyInfo })
  })

  it('数据必须包含 id 属性', () => {
    const itemToEdit = makeFakeItem({ id: undefined })
    expect(editItem(patchedToken(itemToEdit))).rejects.toThrow('id 属性不能忽略')
  })

  it('数据库查询无果将抛出异常', () => {
    const itemToEdit = makeFakeItem()
    return expect(editItem(patchedToken(itemToEdit))).rejects.toThrow('物品未找到')
  })
})
