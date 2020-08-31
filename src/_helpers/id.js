import cuid from 'cuid'

export const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})
