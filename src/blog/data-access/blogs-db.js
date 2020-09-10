import { Id } from '../../_helpers'
export default function makeBlogsDb ({ makeDb, collectionName }) {
  return Object.freeze({
    insert,
    remove,
    update,
    findAll,
    findById,
    findByTitle
  })

  async function insert ({ id: _id = Id.makeId(), ...blogInfo }) {
    const db = await makeDb()
    const result = await db.collection(collectionName).insertOne({
      _id,
      ...blogInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(collectionName).find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return {
      id, ...info
    }
  }

  async function findByTitle ({ title }) {
    const db = await makeDb()
    const result = await db.collection(collectionName).find({ title })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return {
      id, ...info
    }
  }

  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(collectionName).deleteOne({ _id })
    return result.deletedCount
  }

  async function update ({ id: _id = Id.makeId(), ...blogInfo }) {
    const db = await makeDb()
    const result = await db.collection(collectionName).updateOne(
      { _id },
      { $set: { ...blogInfo } }
    )
    return result.modifiedCount > 0 ? { id: _id, ...blogInfo } : null
  }

  async function findAll () {
    const db = await makeDb()
    const result = await db.collection(collectionName).find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
}
