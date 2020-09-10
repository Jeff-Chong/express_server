export default function makeRemoveBlog ({ blogsDb, verifyInfo, socketClient }) {
  return async function removeBlog ({ authInfo, id } = {}) {
    verifyInfo && verifyInfo(authInfo)

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const exist = await blogsDb.findById({ id })
    if (!exist) {
      return deleteNothing()
    }

    await blogsDb.remove(exist)

    socketClient && socketClient.emitDelete({ id })

    return deleted()
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: 'blog 未找到，数据库无变化'
    }
  }

  function deleted () {
    return {
      deletedCount: 1,
      message: 'blog 已删除'
    }
  }
}
