export default function makeSocketClient ({ makeSocket }) {
  /**
   * @type { SocketIO.Namespace }
   */
  const client = makeSocket({ namespace: '/blog' })

  return Object.freeze({
    emitPost,
    emitUpdate,
    emitDelete
  })

  function emitPost ({ data }) {
    client.emit('POST', data)
  }

  function emitUpdate ({ data }) {
    client.emit('UPDATE', data)
  }

  function emitDelete ({ id }) {
    client.emit('DELETE', id)
  }
}
