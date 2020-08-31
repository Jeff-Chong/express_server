export default function buildMakeItem ({
  Id
}) {
  return function makeItem ({
    id = Id.makeId(),
    name,
    icon = ''
  }) {
    if (!Id.isValidId(id)) {
      throw new Error('Item 具备有效id')
    }
    if (!name) {
      throw new Error('Item 必须有个名称')
    }

    return Object.freeze({
      getName: () => name,
      getId: () => id,
      getIcon: () => icon
    })
  }
}
