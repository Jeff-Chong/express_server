import cuid from 'cuid'
import faker from 'faker'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default function makeFakeHero (overrides) {
  const hero = {
    id: Id.makeId(),
    name: faker.random.words(2),
    parent: null
  }
  return {
    ...hero,
    ...overrides
  }
}
