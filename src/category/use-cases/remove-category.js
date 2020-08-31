export default function makeRemoveCategory ({ categoriesDb, verifyInfo }) {
  return async function removeCategory ({ authInfo, id } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------
    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await categoriesDb.findById({ id })
    if (!existing) {
      return deleteNothing()
    }

    const child = await categoriesDb.findParentChild(existing)
    const deletedChild = await Promise.all(child.map(categoriesDb.remove))
    let deletedCount = deletedChild.reduce((sum, count) => sum + count, 0)
    deletedCount += await categoriesDb.remove(existing)
    return deleted(deletedCount)
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: '分类未找到，数据库无变化'
    }
  }

  function deleted (count) {
    return {
      deletedCount: count,
      message: '分类已删除'
    }
  }
}
