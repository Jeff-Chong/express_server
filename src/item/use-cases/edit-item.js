import makeItem from '../index'
export default function makeEditItem ({ itemsDb, verifyInfo }) {
  return async function editItem ({ authInfo, id, ...changes } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    if (!id) {
      throw new Error('id 属性不能忽略')
    }

    const existing = await itemsDb.findById({ id })
    if (!existing) {
      throw new RangeError('物品未找到')
    }

    const item = makeItem({ ...existing, ...changes })
    const updated = await itemsDb.update({
      id: item.getId(),
      name: item.getName(),
      icon: item.getIcon()
    })

    if (!updated) {
      throw new Error('更新物品失败')
    }

    return { ...existing, ...updated }
  }
}
