import makeBlog from '../index'
export default function makeEditBlog ({ blogsDb, verifyInfo, socketClient }) {
  return async function editBlog ({ authInfo, id, ...changes } = {}) {
    verifyInfo && verifyInfo(authInfo)

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await blogsDb.findById({ id })
    if (!existing) {
      throw new RangeError(`所查询id: ${id} 的 blog 数据未找到`)
    }

    const blog = makeBlog({ ...existing, ...changes, modifiedOn: undefined })

    if (blog.getTitle() !== existing.title) {
      const titleExist = await blogsDb.findByTitle({ title: blog.getTitle() })
      if (titleExist) {
        throw new Error('当前 title 已存在数据库')
      }
    }

    const updated = await blogsDb.update({
      id: blog.getId(),
      tags: blog.getTags(),
      title: blog.getTitle(),
      content: blog.getContent(),
      modifiedOn: blog.getModifiedOn(),
      description: blog.getDescription()
    })
    if (!updated) {
      throw new Error('更新 blog 失败')
    }

    const mergeUpdated = { ...existing, ...updated }

    socketClient && socketClient.emitUpdate({ data: mergeUpdated })

    return mergeUpdated
  }
}
