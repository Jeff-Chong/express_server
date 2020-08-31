import { Id } from '../../_helpers'
export default function makeArticlesDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findById,
    remove,
    update,
    findAll,
    findByTitle
  })

  async function insert ({ id: _id = Id.makeId(), ...articleInfo }) {
    const db = await makeDb()
    const result = await db.collection('articles').insertOne({
      _id,
      ...articleInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('articles').find({ _id })
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
    const result = await db.collection('articles').find({ title })
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
    const result = await db.collection('articles').deleteOne({ _id })
    return result.deletedCount
  }

  async function update ({ id: _id = Id.makeId(), ...articleInfo }) {
    const db = await makeDb()
    const result = await db.collection('articles').updateOne(
      { _id },
      { $set: { ...articleInfo } }
    )
    return result.modifiedCount > 0 ? { id: _id, ...articleInfo } : null
  }

  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('articles').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
}
