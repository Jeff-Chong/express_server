export default function makeListArticles ({ articlesDb }) {
  return async function listArticles ({ id } = {}) {
    if (id) {
      const existing = await articlesDb.findById({ id })
      if (!existing) {
        throw new RangeError('文章未找到')
      }
      return existing
    }

    const articles = await articlesDb.findAll()

    const imperfectArticles = articles.map(article => {
      return {
        id: article.id,
        title: article.title,
        modifiedOn: article.modifiedOn
      }
    })

    return imperfectArticles
  }
}
