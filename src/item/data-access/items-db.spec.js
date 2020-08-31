import makeDb from '../../../__test__/fixtures/db'
import makeFakeItem from '../../../__test__/fixtures/item'
import makeItemsDb from './items-db'

describe('items db', () => {
  let itemsDb
  beforeEach(() => {
    itemsDb = makeItemsDb({ makeDb })
  })

  it('添加一个物品, 返回原物品信息', async () => {
    const article = makeFakeItem()
    const result = await itemsDb.insert(article)
    expect(result).toEqual(article)
  })

  it('删除一个物品, 返回删除数', async () => {
    const article = makeFakeItem()
    await itemsDb.insert(article)

    const result = await itemsDb.remove(article)
    expect(result).toBe(1)
    const zeroResult = await itemsDb.remove(article)
    expect(zeroResult).toBe(0)
  })

  it('更新一个物品, 成功返回物品信息，否则返回 null', async () => {
    const article = makeFakeItem()
    await itemsDb.insert(article)
    article.name = 'changed'

    const updated = await itemsDb.update(article)
    expect(updated.name).toBe('changed')
  })

  it('通过 id 查询一个物品，无则返回 null，否则返回物品信息', async () => {
    const article = makeFakeItem()
    await itemsDb.insert(article)

    let found = await itemsDb.findById({ id: 'sdfsdfsdf' })
    expect(found).toBe(null)

    found = await itemsDb.findById(article)
    expect(found).toEqual(article)
  })

  it('通过 name 查询物品，无则返回 null，否则返回物品信息', async () => {
    const item = makeFakeItem()
    await itemsDb.insert(item)

    let found = await itemsDb.findByName({ name: 'randomName' })
    expect(found).toBe(null)

    found = await itemsDb.findByName(item)
    expect(found).toEqual(item)
  })

  it('查询全部物品', async () => {
    const inserts = await Promise.all(
      [makeFakeItem(), makeFakeItem(), makeFakeItem()].map(
        itemsDb.insert
      )
    )
    const found = await itemsDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })
})
