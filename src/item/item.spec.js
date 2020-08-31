import makeItem from './'
import makeFakeItem from '../../__test__/fixtures/item'

describe('item entity', () => {
  it('必须具备 name 属性', () => {
    const item = makeFakeItem({ name: null })
    expect(() => makeItem(item)).toThrow('Item 必须有个名称')
  })

  it('自生成 id 属性', () => {
    const item = makeFakeItem({ id: 'invalid' })
    expect(() => makeItem(item)).toThrow('Item 具备有效id')

    const noId = makeFakeItem({ id: undefined })
    expect(() => makeItem(noId)).not.toThrow()
  })
})
