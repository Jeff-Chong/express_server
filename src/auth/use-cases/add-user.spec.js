import makeAddUser from './add-user'
import makeUsersDb from '../data-access/users-db'
import makeDb from '../../../__test__/fixtures/db'
import makeFakeUser from '../../../__test__/fixtures/user'

describe('add user', () => {
  let usersDb
  beforeAll(() => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('username 在数据库必须唯一', async () => {
    expect.assertions(1)
    try {
      const fakeUser = makeFakeUser()
      const addUser = makeAddUser({ usersDb })
      await addUser(fakeUser)
      await addUser(fakeUser)
    } catch (e) {
      expect(e.message).toBe('当前用户已存在')
    }
  })
})
