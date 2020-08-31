import makeAddItem from './add-item'
import makeEditItem from './edit-item'
import makeRemoveItem from './remove-item'
import makeListItems from './list-items'
import { verifyInfo } from '../../_helpers'

import itemsDb from '../data-access'

const addItem = makeAddItem({ itemsDb, verifyInfo })
const editItem = makeEditItem({ itemsDb, verifyInfo })
const listItems = makeListItems({ itemsDb })
const removeItem = makeRemoveItem({ itemsDb, verifyInfo })

const itemService = Object.freeze({
  addItem,
  editItem,
  listItems,
  removeItem
})

export default itemService
export { addItem, editItem, listItems, removeItem }
