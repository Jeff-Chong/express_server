import bcryptjs from 'bcrypt'

export const bcrypt = Object.freeze({
  genSaltSync: bcryptjs.genSaltSync,
  hashSync: bcryptjs.hashSync
})
