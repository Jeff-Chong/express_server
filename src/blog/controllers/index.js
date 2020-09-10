import {
  addBlog,
  editBlog,
  listBlogs,
  removeBlog
} from '../use-cases'

import makeGetBlogs from './get-blogs'
import makePostBlog from './post-blog'
import makePatchBlog from './patch-blog'
import makeDeleteBlog from './delete-blog'

const getBlogs = makeGetBlogs({ listBlogs })
const postBlog = makePostBlog({ addBlog })
const patchBlog = makePatchBlog({ editBlog })
const deleteBlog = makeDeleteBlog({ removeBlog })

const blogController = Object.freeze({
  getBlogs,
  postBlog,
  patchBlog,
  deleteBlog
})

export default blogController

export { getBlogs, postBlog, patchBlog, deleteBlog }
