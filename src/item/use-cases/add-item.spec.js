import makeDb from '../../../__test__/fixtures/db'
import makeAddItem from './add-item'
import makeItemsDb from '../data-access/items-db'
import makeFakeItem from '../../../__test__/fixtures/item'
// ---
import { jwt, verifyInfo } from '../../_helpers'

describe('add item', () => {
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
  let addItem
  beforeAll(() => {
    makeToken()
    itemsDb = makeItemsDb({ makeDb })
    addItem = makeAddItem({ itemsDb, verifyInfo })
  })

  it('需要提供验证信息', () => {
    const newItem = makeFakeItem()
    return expect(addItem({ authInfo: undefined, ...newItem })).rejects.toThrow('请携带验证信息')
  })

  it('需要提供有效验证信息', () => {
    const newItem = makeFakeItem()
    return expect(addItem({ authInfo: 'abcdefg', ...newItem })).rejects.toThrow('请携带有效验证信息')
  })

  it('只有 admin 用户才可以操作', () => {
    const token = jwt.sign({ username: 'other' }, jwt.secret(), jwt.options())
    const newItem = makeFakeItem()
    return expect(addItem({ authInfo: token, ...newItem })).rejects.toThrow('您不具备此操作')
  })

  it('添加 item 信息入数据库，如果 name 已在数据库抛出错误', async () => {
    const newItem = makeFakeItem()
    const inserted = await addItem(patchedToken(newItem))
    expect(inserted).toMatchObject(newItem)

    try {
      await addItem(patchedToken(newItem))
    } catch (e) {
      expect(e.message).toBe('物品已经存在数据库')
    }
  })
})
