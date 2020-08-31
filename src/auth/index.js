import { Id, bcrypt } from '../_helpers'
import buildMakeUser from './user'

const makeUser = buildMakeUser({ Id, bcrypt })

export default makeUser
