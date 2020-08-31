import makeFakeCategory from '../../__test__/fixtures/category'
import makeCategory from './'

describe('category entity', () => {
  it('必须具备 name 属性', () => {
    const category = makeFakeCategory({ name: null })
    expect(() => makeCategory(category)).toThrow('Category 必须有个名称')
  })

  it('自生成 id 属性', () => {
    const category = makeFakeCategory({ id: 'invalid' })
    expect(() => makeCategory(category)).toThrow('Category 具备有效id')

    const noId = makeFakeCategory({ id: undefined })
    expect(() => makeCategory(noId)).not.toThrow()
  })

  it('具有 parent 属性，默认值为null', () => {
    const noParent = makeFakeCategory({ parent: undefined })
    const category = makeCategory(noParent)
    expect(category.getParent()).toBe(null)
  })

  it('parent 属性不为 null 时，且有效 id 值', () => {
    const category = makeFakeCategory({ parent: 'invalid' })
    expect(() => makeCategory(category)).toThrow('Category parent 非有效数据')
  })
})
