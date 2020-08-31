import makeUser from '../index'

export default function makeAddUser ({ usersDb }) {
  return async function addUser (userInfo) {
    const user = makeUser(userInfo)
    const exists = await usersDb.findByName({ username: user.getUsername() })
    if (exists) {
      throw new Error('当前用户已存在')
    }

    return usersDb.insert({
      id: user.getId(),
      salt: user.getSalt(),
      username: user.getUsername(),
      password: user.getPassword()
    })
  }
}
