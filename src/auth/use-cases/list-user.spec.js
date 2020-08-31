import makeListUser from './list-user'
import makeAddUser from './add-user'
import makeUsersDb from '../data-access/users-db'
import makeDb from '../../../__test__/fixtures/db'
import makeFakeUser from '../../../__test__/fixtures/user'
import handleValidate from './handle-validate'
import handleToken from './handle-token'

describe('list user', () => {
  let usersDb
  let listUser
  let addUser
  beforeEach(() => {
    usersDb = makeUsersDb({ makeDb })
    listUser = makeListUser({ usersDb, handleValidate, handleToken })
    addUser = makeAddUser({ usersDb })
  })

  it('username 与 password 必须完整', () => {
    return expect(listUser()).rejects.toThrow('用户信息不完整')
  })

  it('用户确保在数据库里', async () => {
    const user = makeFakeUser()
    return expect(listUser(user)).rejects.toThrow('该用户尚未注册')
  })

  it('验证用户数据', async () => {
    expect.assertions(1)
    try {
      const user = makeFakeUser()
      await addUser(user)
      await listUser({ username: user.username, password: 'xyz' })
    } catch (e) {
      expect(e.message).toBe('密码校验错误')
    }
  })

  it('正确返回数据', async () => {
    const user = makeFakeUser()
    await addUser(user)
    const result = await listUser(user)
    expect(result.token).not.toBeNull()
  })
})
