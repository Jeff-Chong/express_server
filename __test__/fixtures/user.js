import cuid from 'cuid'
import faker from 'faker'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default function makeFakeUser (overrides) {
  const user = {
    id: Id.makeId(),
    username: faker.name.findName(),
    password: faker.internet.password()
  }
  return {
    ...user,
    ...overrides
  }
}
