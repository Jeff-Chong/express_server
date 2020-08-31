export default function makeListItems ({ itemsDb }) {
  return async function listItems ({ id } = {}) {
    if (id) {
      const existing = await itemsDb.findById({ id })
      if (!existing) {
        throw new RangeError('物品未找到')
      }
      return existing
    }

    const items = await itemsDb.findAll()
    return items
  }
}
