import { jwt } from '../../_helpers'
export default function handleToken (data) {
  return jwt.sign(data, jwt.secret(), jwt.options())
}
