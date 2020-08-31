import { Id } from '../../_helpers'
export default function makeCategoriesDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findById,
    findAll,
    findOnlyParent,
    findParentChild,
    findByName,
    remove,
    update
  })

  async function insert ({ id: _id = Id.makeId(), ...categoryInfo }) {
    const db = await makeDb()
    const result = await db.collection('categories').insertOne({ _id, ...categoryInfo })
    const { _id: id, ...insertInfo } = result.ops[0]
    return { id, ...insertInfo }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('categories').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    return { id, ...insertedInfo }
  }

  async function findByName ({ name }) {
    const db = await makeDb()
    const result = await db.collection('categories').find({ name })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    return { id, ...insertedInfo }
  }

  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('categories').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }

  async function findOnlyParent () {
    const db = await makeDb()
    const result = await db.collection('categories').find()
    return (await result.toArray())
      .map(({ _id: id, ...found }) => ({
        id,
        ...found
      })
      ).filter(({ parent }) => !parent)
  }

  async function findParentChild ({ id }) {
    const db = await makeDb()
    const result = await db.collection('categories').find()
    return (await result.toArray())
      .map(({ _id: id, ...found }) => ({
        id,
        ...found
      })
      ).filter(({ parent }) => parent === id)
  }

  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('categories').deleteOne({ _id })
    return result.deletedCount
  }

  async function update ({ id: _id = Id.makeId(), ...categoryInfo }) {
    const db = await makeDb()
    const result = await db.collection('categories').updateOne(
      { _id },
      { $set: { ...categoryInfo } }
    )
    return result.modifiedCount > 0 ? { id: _id, ...categoryInfo } : null
  }
}
