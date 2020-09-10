import socketIO from 'socket.io'

export default function buildMakeSocketIO ({ socketPort }) {
  const io = socketIO(socketPort)
  console.log(`SocketIO is listening on port ${socketPort}`)
  return function makeSocketIO ({ namespace = '/' }) {
    if (!(namespace.charAt(0) === '/')) {
      console.error(`socketIO 的命名空间需以 / 开头, 当前 namespace : ${namespace}`)
      process.exit(1)
    }
    return io.of(namespace)
  }
}
