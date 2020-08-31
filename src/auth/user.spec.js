import makeFakeUser from '../../__test__/fixtures/user'
import makeUser from './'

describe('user entity', () => {
  it('必须具备 username 属性', () => {
    const user = makeFakeUser({ username: null })
    expect(() => makeUser(user)).toThrow('用户必须有 username')
  })

  it('必须具 password 属性', () => {
    const user = makeFakeUser({ password: null })
    expect(() => makeUser(user)).toThrow('用户必须有 password')
  })

  it('自生成 id 属性', () => {
    const user = makeFakeUser({ id: 'invalid' })
    expect(() => makeUser(user)).toThrow('用户必须有有效 id')

    const noId = makeFakeUser({ id: undefined })
    expect(() => makeUser(noId)).not.toThrow()
  })

  it('生成 salt 属性', () => {
    const user = makeFakeUser()
    const u = makeUser(user)
    expect(u.getSalt()).not.toBeUndefined()
  })

  it('password 将会被加密', () => {
    const user = makeFakeUser()
    const u = makeUser(user)
    expect(u.getPassword()).not.toBeUndefined()
    expect(u.getPassword()).not.toBe(user.password)
  })
})
