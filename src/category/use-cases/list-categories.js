export default function makeListCategories ({ categoriesDb }) {
  return async function listCategories ({ id, query = {} } = {}) {
    const { parent } = query
    if (parent) {
      const categoriesParent = await categoriesDb.findOnlyParent()
      return categoriesParent
    }

    if (id) {
      const existing = await categoriesDb.findById({ id })
      if (!existing) {
        throw new RangeError('物品未找到')
      }
      return existing
    }

    const categories = await categoriesDb.findAll()
    return categories
  }
}
