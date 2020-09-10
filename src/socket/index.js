import { SOCKET_PORT } from '../_helpers'
import buildMakeSocketIO from './socket-io'
const makeSocketIO = buildMakeSocketIO({ socketPort: SOCKET_PORT })

export {
  makeSocketIO
}
