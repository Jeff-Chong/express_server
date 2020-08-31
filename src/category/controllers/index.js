import {
  addCategory,
  editCategory,
  listCategories,
  removeCategory
} from '../use-cases'

import makeGetCategories from './get-categories'
import makePostCategory from './post-category'
import makePatchCategory from './patch-category'
import makeDeleteCategory from './delete-category'

const getCategories = makeGetCategories({ listCategories })
const postCategory = makePostCategory({ addCategory })
const patchCategory = makePatchCategory({ editCategory })
const deleteCategory = makeDeleteCategory({ removeCategory })

const categoriesController = Object.freeze({
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory
})

export default categoriesController

export { getCategories, postCategory, patchCategory, deleteCategory }
