import makeArticle from './'
import makeFakeArticle from '../../__test__/fixtures/article'

describe('item entity', () => {
  it('必须具备 name 属性', () => {
    const item = makeFakeArticle({ title: null })
    expect(() => makeArticle(item)).toThrow('Article 必须有个标题')
  })

  it('自生成 id 属性', () => {
    const item = makeFakeArticle({ id: 'invalid' })
    expect(() => makeArticle(item)).toThrow('Article 具备有效id')

    const noId = makeFakeArticle({ id: undefined })
    expect(() => makeArticle(noId)).not.toThrow()
  })
})
