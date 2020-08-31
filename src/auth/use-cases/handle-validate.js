import { bcrypt } from '../../_helpers'
export default function handleValidate ({ password, salt }, originPassword) {
  const hash = bcrypt.hashSync(originPassword, salt)
  return hash === password
}
