import makeCategory from '../index'
export default function makeEditCategory ({ categoriesDb, verifyInfo }) {
  return async function editCategory ({ authInfo, id, ...changes } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await categoriesDb.findById({ id })
    if (!existing) {
      throw new RangeError('分类未找到')
    }
    const category = makeCategory({ ...existing, ...changes })
    const updated = await categoriesDb.update({
      id: category.getId(),
      name: category.getName(),
      parent: category.getParent()
    })
    return { ...existing, ...updated }
  }
}
