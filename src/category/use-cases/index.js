import makeAddCategory from './add-category'
import makeEditCategory from './edit-category'
import makeRemoveCategory from './remove-category'
import makeListCategories from './list-categories'
import { verifyInfo } from '../../_helpers'

import categoriesDb from '../data-access'

const addCategory = makeAddCategory({ categoriesDb, verifyInfo })
const editCategory = makeEditCategory({ categoriesDb, verifyInfo })
const listCategories = makeListCategories({ categoriesDb })
const removeCategory = makeRemoveCategory({ categoriesDb, verifyInfo })

const itemService = Object.freeze({
  addCategory,
  editCategory,
  listCategories,
  removeCategory
})

export default itemService
export { addCategory, editCategory, listCategories, removeCategory }
