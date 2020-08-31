import makeArticle from '../index'
export default function makeEditArticle ({ articlesDb, verifyInfo }) {
  return async function editArticle ({ authInfo, id, ...changes } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await articlesDb.findById({ id })
    if (!existing) {
      throw new RangeError('文章未找到')
    }
    const article = makeArticle({ ...existing, ...changes, modifiedOn: undefined })
    const updated = await articlesDb.update({
      id: article.getId(),
      title: article.getTitle(),
      content: article.getContent(),
      modifiedOn: article.getModifiedOn(),
      categories: article.getCategories()
    })

    if (!updated) {
      throw new Error('更新文章失败')
    }

    return { ...existing, ...updated }
  }
}
