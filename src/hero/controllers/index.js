import {
  addHero,
  editHero,
  listHeroes,
  removeHero
} from '../use-cases'

import makeGetHeroes from './get-heroes'
import makePostHero from './post-hero'
import makePatchHero from './patch-hero'
import makeDeleteHero from './delete-hero'

const getHeroes = makeGetHeroes({ listHeroes })
const postHero = makePostHero({ addHero })
const patchHero = makePatchHero({ editHero })
const deleteHero = makeDeleteHero({ removeHero })

const heroController = Object.freeze({
  getHeroes,
  postHero,
  patchHero,
  deleteHero
})

export default heroController

export { getHeroes, postHero, patchHero, deleteHero }
