export default function buildMakeArticle ({
  Id
}) {
  return function makeArticle ({
    id = Id.makeId(),
    title,
    content = '',
    categories = [],
    createdOn = Date.now(),
    modifiedOn = Date.now()
  }) {
    if (!Id.isValidId(id)) {
      throw new Error('Article 具备有效id')
    }
    if (!title) {
      throw new Error('Article 必须有个标题')
    }
    if (!categories) {
      throw new Error('Article 需要分类别')
    }
    if (!Array.isArray(categories)) {
      throw new Error('Article 各分类包含在数组里')
    }
    if (!categories.every(id => Id.isValidId(id))) {
      throw new Error('Article 分类数据必须为 id 值')
    }

    return Object.freeze({
      getCategories: () => categories,
      getModifiedOn: () => modifiedOn,
      getCreatedOn: () => createdOn,
      getContent: () => content,
      getTitle: () => title,
      getId: () => id
    })
  }
}
