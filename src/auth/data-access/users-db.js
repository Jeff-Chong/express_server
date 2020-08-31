import { Id } from '../../_helpers'
export default function makeUsersDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findByName,
    remove
  })

  async function insert ({ id: _id = Id.makeId(), ...userInfo }) {
    const db = await makeDb()
    const result = await db.collection('users').insertOne({ _id, ...userInfo })
    const { _id: id, ...insertInfo } = result.ops[0]
    return { id, ...insertInfo }
  }

  async function findByName ({ username }) {
    const db = await makeDb()
    const result = await db.collection('users').find({ username })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    return { id, ...insertedInfo }
  }

  async function remove ({ username }) {
    const db = await makeDb()
    const result = await db.collection('users').deleteOne({ username })
    return result.deletedCount
  }
}
