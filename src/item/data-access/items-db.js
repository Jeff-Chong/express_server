import { Id } from '../../_helpers'
export default function makeItemsDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findById,
    remove,
    update,
    findAll,
    findByName
  })

  async function insert ({ id: _id = Id.makeId(), ...itemInfo }) {
    const db = await makeDb()
    const result = await db.collection('items').insertOne({
      _id,
      ...itemInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('items').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return {
      id, ...info
    }
  }

  async function findByName ({ name }) {
    const db = await makeDb()
    const result = await db.collection('items').find({ name })
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
    const result = await db.collection('items').deleteOne({ _id })
    return result.deletedCount
  }

  async function update ({ id: _id = Id.makeId(), ...itemInfo }) {
    const db = await makeDb()
    const result = await db.collection('items').updateOne(
      { _id },
      { $set: { ...itemInfo } }
    )
    return result.modifiedCount > 0 ? { id: _id, ...itemInfo } : null
  }

  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('items').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
}
