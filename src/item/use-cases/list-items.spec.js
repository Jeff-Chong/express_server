import makeDb from '../../../__test__/fixtures/db'
import makeListItems from './list-items'
import makeItemsDb from '../data-access/items-db'
import makeFakeItem from '../../../__test__/fixtures/item'

describe('list item', () => {
  let itemsDb
  beforeAll(() => {
    itemsDb = makeItemsDb({ makeDb })
  })

  it('获取全部物品', async () => {
    const listItems = makeListItems({ itemsDb })
    const inserts = await Promise.all(
      [makeFakeItem(), makeFakeItem(), makeFakeItem()].map(
        itemsDb.insert
      )
    )
    const found = await listItems()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })
})
