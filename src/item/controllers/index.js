import {
  addItem,
  editItem,
  listItems,
  removeItem
} from '../use-cases'

import makeGetItems from './get-items'
import makePostItem from './post-item'
import makePatchItem from './patch-item'
import makeDeleteItem from './delete-item'

const getItems = makeGetItems({ listItems })
const postItem = makePostItem({ addItem })
const patchItem = makePatchItem({ editItem })
const deleteItem = makeDeleteItem({ removeItem })

const itemController = Object.freeze({
  getItems,
  postItem,
  patchItem,
  deleteItem
})

export default itemController

export { getItems, postItem, patchItem, deleteItem }
