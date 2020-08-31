import cuid from 'cuid'
import faker from 'faker'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default function makeFakeArticle (overrides) {
  const article = {
    id: Id.makeId(),
    title: faker.random.words(2),
    content: faker.random.words(30),
    createdOn: Date.now(),
    modifiedOn: Date.now()
  }
  article.categories = [Id.makeId(), Id.makeId()]
  return {
    ...article,
    ...overrides
  }
}
