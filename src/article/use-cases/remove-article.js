export default function makeRemoveArticle ({ articlesDb, verifyInfo }) {
  return async function removeArticle ({ authInfo, id } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await articlesDb.findById({ id })
    if (!existing) {
      return deleteNothing()
    }

    await articlesDb.remove(existing)
    return deleted()
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: '文章未找到，数据库无变化'
    }
  }

  function deleted () {
    return {
      deletedCount: 1,
      message: '文章已删除'
    }
  }
}
