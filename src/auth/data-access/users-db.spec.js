import makeDb from '../../../__test__/fixtures/db'
import makeUsersDb from './users-db'
import makeFakeUser from '../../../__test__/fixtures/user'

describe('users db', () => {
  let usersDb

  beforeEach(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('添加一个用户', async () => {
    const user = makeFakeUser()
    const result = await usersDb.insert(user)
    expect(result).toEqual(user)
  })

  it('通过 username 查询用户', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    const found = await usersDb.findByName(user)
    expect(found).toEqual(user)
  })

  it('通过 username 查询用户，查询无果返回 null', async () => {
    const found = await usersDb.findByName({ username: 'undefined' })
    expect(found).toBeNull()
  })

  it('通过 username 删除用户，返回删除数量', async () => {
    const user = makeFakeUser()
    const result = await usersDb.insert(user)
    const count = await usersDb.remove(result)
    expect(count).toBe(1)
  })
})
