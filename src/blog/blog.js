export default function buildMakeBlog ({ Id }) {
  return function makeBlog ({
    id = Id.makeId(),
    title,
    content = '',
    description = '',
    tags = [],
    createdOn = Date.now(),
    modifiedOn = Date.now()
  }) {
    if (!Id.isValidId(id)) {
      throw new Error('Blog 的 id 不是有效值')
    }
    if (!title) {
      throw new Error('Blog 必须')
    }
    if (!Array.isArray(tags)) {
      throw new Error('Blog 的标签需放置在数组')
    }
    if (!tags.every(tag => typeof tag === 'string')) {
      throw new Error('Blog 的标签都是字符串')
    }

    return Object.freeze({
      getId: () => id,
      getTags: () => tags,
      getTitle: () => title,
      getContent: () => content,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getDescription: () => description
    })
  }
}
