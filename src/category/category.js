export default function buildMakeCategory ({
  Id
}) {
  return function makeCategory ({
    id = Id.makeId(),
    name,
    parent = null
  }) {
    if (!name) {
      throw new Error('Category 必须有个名称')
    }
    if (!Id.isValidId(id)) {
      throw new Error('Category 具备有效id')
    }
    if (parent && !Id.isValidId(parent)) {
      throw new Error('Category parent 非有效数据')
    }

    return Object.freeze({
      getName: () => name,
      getParent: () => parent,
      getId: () => id
    })
  }
}
