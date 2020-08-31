import cuid from 'cuid'
import faker from 'faker'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default function makeFakeItem (overrides) {
  const item = {
    id: Id.makeId(),
    name: faker.random.words(2),
    icon: faker.image.image()
  }
  return {
    ...item,
    ...overrides
  }
}
