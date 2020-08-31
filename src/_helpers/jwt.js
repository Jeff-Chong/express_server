import jsonWebToken from 'jsonwebtoken'
import { JWT_SECRET, JWT_ADMIN_NAME } from './secrets'

const SECOND_MS = 1000
const MINUTE_MS = SECOND_MS * 60
const HOUR_MS = MINUTE_MS * 60
const DAY_MS = HOUR_MS * 25

const admin = JWT_ADMIN_NAME
const secret = JWT_SECRET
const options = {}

export const jwt = Object.freeze({
  admin: () => admin,
  secret: () => secret,
  options: () => options,
  sign: jsonWebToken.sign,
  verify: jsonWebToken.verify,
  expiresIn: () => ({
    SECOND_MS,
    MINUTE_MS,
    HOUR_MS,
    DAY_MS
  })
})

export function verifyInfo (authInfo) {
  // 验证权限
  if (!authInfo) {
    throw new Error('请携带验证信息')
  }
  let payload
  try {
    payload = jwt.verify(authInfo, jwt.secret())
  } catch (e) {
    throw new Error('请携带有效验证信息')
  }
  const { username } = payload
  if (username !== jwt.admin()) {
    throw new Error('您不具备此操作')
  }
  // -------
}
