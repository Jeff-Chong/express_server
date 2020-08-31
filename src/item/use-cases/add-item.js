import makeItem from '../index'
export default function makeAddItem ({ itemsDb, verifyInfo }) {
  return async function addItem ({ authInfo, ...dataInfo } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    const item = makeItem(dataInfo)
    const exists = await itemsDb.findByName({ name: item.getName() })
    if (exists) {
      throw new Error('物品已经存在数据库')
    }
    return itemsDb.insert({
      id: item.getId(),
      name: item.getName(),
      icon: item.getIcon()
    })
  }
}
