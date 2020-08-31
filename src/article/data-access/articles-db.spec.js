import makeDb from '../../../__test__/fixtures/db'
import makeFakeArticle from '../../../__test__/fixtures/article'
import makeArticlesDb from './articles-db'

describe('articles db', () => {
  let articlesDb
  beforeEach(() => {
    articlesDb = makeArticlesDb({ makeDb })
  })

  it('添加一篇文章, 返回原文章信息', async () => {
    const article = makeFakeArticle()
    const result = await articlesDb.insert(article)
    expect(result).toEqual(article)
  })

  it('删除一篇文章, 返回删除数', async () => {
    const article = makeFakeArticle()
    await articlesDb.insert(article)

    const result = await articlesDb.remove(article)
    expect(result).toBe(1)
    const zeroResult = await articlesDb.remove(article)
    expect(zeroResult).toBe(0)
  })

  it('更新一篇文章, 成功返回文章信息，否则返回 null', async () => {
    const article = makeFakeArticle()
    await articlesDb.insert(article)
    article.content = 'changed'

    const updated = await articlesDb.update(article)
    expect(updated.content).toBe('changed')
  })

  it('通过 id 查询一篇文章，无则返回 null，否则返回文章信息', async () => {
    const article = makeFakeArticle()
    await articlesDb.insert(article)

    let found = await articlesDb.findById({ id: 'sdfsdfsdf' })
    expect(found).toBe(null)

    found = await articlesDb.findById(article)
    expect(found).toEqual(article)
  })

  it('通过 title 查询一篇文章，无则返回 null，否则返回文章信息', async () => {
    const article = makeFakeArticle()
    await articlesDb.insert(article)

    let found = await articlesDb.findByTitle({ title: 'randomTitle' })
    expect(found).toBe(null)

    found = await articlesDb.findByTitle(article)
    expect(found).toEqual(article)
  })

  it('查询全部文章', async () => {
    const inserts = await Promise.all(
      [makeFakeArticle(), makeFakeArticle(), makeFakeArticle()].map(
        articlesDb.insert
      )
    )
    const found = await articlesDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })
})
