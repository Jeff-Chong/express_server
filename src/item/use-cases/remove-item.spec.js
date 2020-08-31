import makeDb from '../../../__test__/fixtures/db'
import makeRemoveItem from './remove-item'
import makeItemsDb from '../data-access/items-db'
import makeFakeItem from '../../../__test__/fixtures/item'
// ---
import { jwt, verifyInfo } from '../../_helpers'

describe('remove item', () => {
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
  let removeItem
  beforeAll(() => {
    makeToken()
    itemsDb = makeItemsDb({ makeDb })
    removeItem = makeRemoveItem({ itemsDb, verifyInfo })
  })

  it('数据必须包含 id 属性', () => {
    const item = makeFakeItem({ id: undefined })
    expect(removeItem(patchedToken(item))).rejects.toThrow('id 属性不能忽略')
  })

  it('处理不存在的物品', async () => {
    const fakeItem = makeFakeItem()
    const expected = {
      deletedCount: 0,
      message: '物品未找到，数据库无变化'
    }
    const actual = await removeItem(patchedToken(fakeItem))
    expect(actual).toEqual(expected)
  })

  it('处理存在的文章', async () => {
    const fakeItem = makeFakeItem()
    await itemsDb.insert(fakeItem)

    const found = await itemsDb.findById(fakeItem)
    expect(found).toEqual(fakeItem)

    const expected = {
      deletedCount: 1,
      message: '物品已删除'
    }

    const actual = await removeItem(patchedToken(fakeItem))
    expect(actual).toEqual(expected)

    const notFound = await itemsDb.findById(fakeItem)
    expect(notFound).toBe(null)
  })
})
