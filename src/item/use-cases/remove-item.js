export default function makeRemoveItem ({ itemsDb, verifyInfo }) {
  return async function removeItem ({ authInfo, id } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await itemsDb.findById({ id })
    if (!existing) {
      return deleteNothing()
    }

    await itemsDb.remove(existing)
    return deleted()
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: '物品未找到，数据库无变化'
    }
  }

  function deleted () {
    return {
      deletedCount: 1,
      message: '物品已删除'
    }
  }
}
