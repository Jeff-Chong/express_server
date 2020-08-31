import { listConstellations } from '../use-cases'
import makeGetConstellations from './get-constellations'

export const getConstellations = makeGetConstellations({ listConstellations })
