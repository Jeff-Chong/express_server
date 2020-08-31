import {
  addUser,
  listUser
} from '../use-cases'

import makeSignUp from './sign-up'
import makeSignIn from './sign-in'

const signIn = makeSignIn({ listUser })
const signUp = makeSignUp({ addUser })

const itemController = Object.freeze({
  signIn,
  signUp
})

export default itemController

export { signIn, signUp }
