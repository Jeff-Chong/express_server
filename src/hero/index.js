import { Id } from '../_helpers'
import buildMakeSkill from './skill'
import buildMakeScores from './scores'
import buildMakePartner from './partner'
import buildMakeHero from './hero'

const makeSkill = buildMakeSkill()
const makeScores = buildMakeScores()
const makePartner = buildMakePartner({ Id })
const makeHero = buildMakeHero({ Id, makeScores, makePartner, makeSkill })

export default makeHero
