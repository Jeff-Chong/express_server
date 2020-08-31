export default function buildMakeUser ({
  Id, bcrypt
}) {
  return function makeUser ({
    id = Id.makeId(),
    username,
    password
  }) {
    if (!Id.isValidId(id)) {
      throw new Error('用户必须有有效 id')
    }
    if (!username) {
      throw new Error('用户必须有 username')
    }
    if (!password) {
      throw new Error('用户必须有 password')
    }

    // bcrypt 可以指代任何工具
    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)

    return Object.freeze({
      getUsername: () => username,
      getPassword: () => password,
      getSalt: () => salt,
      getId: () => id
    })
  }
}
