import makeDb from '../../../__test__/fixtures/db'
import makeCategories from './categories-db'
import makeFakeCategory from '../../../__test__/fixtures/category'

describe('users db', () => {
  let categoriesDb

  beforeEach(async () => {
    categoriesDb = makeCategories({ makeDb })
  })

  it('添加一个分类', async () => {
    let category = makeFakeCategory()
    let result = await categoriesDb.insert(category)
    expect(result).toEqual(category)

    category = makeFakeCategory({ parent: null })
    result = await categoriesDb.insert(category)
    expect(result).toEqual(category)
  })

  it('通过 id 查询 category，查询无果返回 null', async () => {
    let found = await categoriesDb.findById({ id: 'undefined' })
    expect(found).toBeNull()

    const category = makeFakeCategory()
    await categoriesDb.insert(category)
    found = await categoriesDb.findById(category)
    expect(found).toEqual(category)
  })

  it('查询全部分类', async () => {
    const inserts = await Promise.all(
      [makeFakeCategory(), makeFakeCategory(), makeFakeCategory()].map(
        categoriesDb.insert
      )
    )
    const found = await categoriesDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('只查询全部父级分类', async () => {
    const parent1 = makeFakeCategory({ parent: null })
    const parent2 = makeFakeCategory({ parent: null })
    const child = makeFakeCategory({ parent: parent1.id })
    await Promise.all([parent1, parent2, child].map(categoriesDb.insert))
    const found = await categoriesDb.findOnlyParent()
    expect(found).toContainEqual(parent1)
    expect(found).toContainEqual(parent2)
    expect(found).not.toContainEqual(child)
  })

  it('根据父级 id 查询子分类', async () => {
    const parent1 = makeFakeCategory({ parent: null })
    const parent2 = makeFakeCategory({ parent: null })
    const child1 = makeFakeCategory({ parent: parent1.id })
    const child2 = makeFakeCategory({ parent: parent1.id })
    const child3 = makeFakeCategory({ parent: parent2.id })

    await Promise.all([parent1, parent2, child1, child2, child3].map(categoriesDb.insert))

    const found = await categoriesDb.findParentChild(parent1)

    expect(found).toContainEqual(child1)
    expect(found).toContainEqual(child2)
    expect(found).not.toContainEqual(child3)
    expect(found).not.toContainEqual(parent1)
    expect(found).not.toContainEqual(parent2)
  })

  it('根据 name 查询分类，有则返回分类信息，无则返回 null', async () => {
    const category = makeFakeCategory()
    await categoriesDb.insert(category)

    let found = await categoriesDb.findByName({ name: 'randomName' })
    expect(found).toBe(null)

    found = await categoriesDb.findByName(category)
    expect(found).toEqual(category)
  })

  it('删除一个分类, 返回删除数', async () => {
    const category = makeFakeCategory()
    await categoriesDb.insert(category)

    const result = await categoriesDb.remove(category)
    expect(result).toBe(1)
    const zeroResult = await categoriesDb.remove(category)
    expect(zeroResult).toBe(0)
  })

  it('更新一个分类, 成功返回分类信息，否则返回 null', async () => {
    const category = makeFakeCategory()
    await categoriesDb.insert(category)
    category.name = 'changed'

    const updated = await categoriesDb.update(category)
    expect(updated.name).toBe('changed')
  })
})
