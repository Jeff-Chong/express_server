import makeArticle from '../index'
export default function makeAddArticle ({ articlesDb, verifyInfo }) {
  return async function addArticle ({ authInfo, ...dataInfo } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    const article = makeArticle(dataInfo)
    const exists = await articlesDb.findByTitle({ title: article.getTitle() })
    if (exists) {
      throw new Error('文章已经存在数据库')
    }
    return articlesDb.insert({
      id: article.getId(),
      title: article.getTitle(),
      content: article.getContent(),
      createdOn: article.getCreatedOn(),
      modifiedOn: article.getModifiedOn(),
      categories: article.getCategories()
    })
  }
}
