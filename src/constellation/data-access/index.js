import makeConstellationsDb from './constellations-db'
import buildMakeDb from '../../db/memoryDb'

const dbName = 'constellation'
const makeDb = buildMakeDb({ dbName })

const constellationsDb = makeConstellationsDb({ makeDb })

export default constellationsDb
