export default function makeListUser ({ usersDb, handleValidate, handleToken }) {
  return async function listUser ({ username, password } = {}) {
    if (!username || !password) {
      throw new Error('用户信息不完整')
    }

    const user = await usersDb.findByName({ username })
    if (!user) {
      throw new Error('该用户尚未注册')
    }

    const isValid = handleValidate(user, password)
    if (!isValid) {
      throw new Error('密码校验错误')
    }

    const token = handleToken({ username: user.username })

    return {
      token
    }
  }
}
