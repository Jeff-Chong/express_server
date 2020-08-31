import makeAddUser from './add-user'
import makeListUser from './list-user'

import handleValidate from './handle-validate'
import handleToken from './handle-token'

import usersDb from '../data-access'

const addUser = makeAddUser({ usersDb })
const listUser = makeListUser({ usersDb, handleToken, handleValidate })

const userService = Object.freeze({
  addUser,
  listUser
})

export default userService
export { addUser, listUser }
