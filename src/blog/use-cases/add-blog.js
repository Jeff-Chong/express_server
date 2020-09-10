import makeBlog from '../index'
export default function makeAddBlog ({ blogsDb, verifyInfo, socketClient }) {
  return async function addBlog ({ authInfo, ...dataInfo } = {}) {
    verifyInfo && verifyInfo(authInfo)

    const blog = makeBlog(dataInfo)
    const exist = await blogsDb.findByTitle({ title: blog.getTitle() })
    if (exist) {
      throw new Error('blog 已经存在数据库中')
    }
    const inserted = await blogsDb.insert({
      id: blog.getId(),
      tags: blog.getTags(),
      title: blog.getTitle(),
      content: blog.getContent(),
      createdOn: blog.getCreatedOn(),
      modifiedOn: blog.getModifiedOn(),
      description: blog.getDescription()
    })

    socketClient && socketClient.emitPost({ data: inserted })

    return inserted
  }
}
