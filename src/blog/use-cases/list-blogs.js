export default function makeListBlogs ({ blogsDb }) {
  return async function listBlogs ({ id } = {}) {
    if (id) {
      const exist = await blogsDb.findById({ id })
      if (!exist) {
        throw new RangeError(`所查询id: ${id} 的 blog 数据未找到`)
      }
      return exist
    }

    const blogs = await blogsDb.findAll()
    const imperfectArticles = blogs.map(blog => {
      return {
        id: blog.id,
        tags: blog.tags,
        title: blog.title,
        description: blog.description,
        createdOn: blog.createdOn,
        modifiedOn: blog.modifiedOn
      }
    })

    return imperfectArticles
  }
}
