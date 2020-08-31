import { Id } from '../../_helpers'
export default function makeHeroesDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findById,
    remove,
    update,
    findAll,
    findByName
  })

  async function insert ({ id: _id = Id.makeId(), ...heroInfo }) {
    const db = await makeDb()
    const result = await db.collection('heros').insertOne({
      _id,
      ...heroInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('heros').find({ _id })
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
    const result = await db.collection('heros').find({ name })
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
    const result = await db.collection('heros').deleteOne({ _id })
    return result.deletedCount
  }

  async function update ({ id: _id = Id.makeId(), ...heroInfo }) {
    const db = await makeDb()
    const result = await db.collection('heros').updateOne(
      { _id },
      { $set: { ...heroInfo } }
    )
    return result.modifiedCount > 0 ? { id: _id, ...heroInfo } : null
  }

  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('heros').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
}
