import makeCategory from '../index'
export default function makeAddCategory ({ categoriesDb, verifyInfo }) {
  return async function addCategory ({ authInfo, ...dataInfo } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    const category = makeCategory(dataInfo)
    const existing = await categoriesDb.findByName({ name: category.getName() })
    if (existing) {
      throw new Error('当前分类已经存在数据库')
    }

    return categoriesDb.insert({
      id: category.getId(),
      name: category.getName(),
      parent: category.getParent()
    })
  }
}
