import makeAddBlog from './add-blog'
import makeEditBlog from './edit-blog'
import makeRemoveBlog from './remove-blog'
import makeListBlogs from './list-blogs'
import { verifyInfo } from '../../_helpers'

import blogsDb from '../data-access'

import { makeSocketIO } from '../../socket'
import makeSocketClient from './socket-client'

const socketClient = makeSocketClient({ makeSocket: makeSocketIO })

const addBlog = makeAddBlog({ blogsDb, verifyInfo, socketClient })
const editBlog = makeEditBlog({ blogsDb, verifyInfo, socketClient })
const listBlogs = makeListBlogs({ blogsDb })
const removeBlog = makeRemoveBlog({ blogsDb, verifyInfo, socketClient })

const blogService = Object.freeze({
  addBlog,
  editBlog,
  listBlogs,
  removeBlog
})

export default blogService
export { addBlog, editBlog, listBlogs, removeBlog }
