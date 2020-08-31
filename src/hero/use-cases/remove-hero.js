export default function makeRemoveHero ({ heroesDb, verifyInfo }) {
  return async function removeHero ({ authInfo, id } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await heroesDb.findById({ id })
    if (!existing) {
      return deleteNothing()
    }

    await heroesDb.remove(existing)
    return deleted()
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: '英雄未找到，数据库无变化'
    }
  }

  function deleted () {
    return {
      deletedCount: 1,
      message: '英雄已删除'
    }
  }
}
