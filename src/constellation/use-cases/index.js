import constellationsDb from '../data-access'
import makeListConstellations from './list-constellations'

export const listConstellations = makeListConstellations({ constellationsDb })
