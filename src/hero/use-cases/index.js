import makeAddHero from './add-hero'
import makeEditHero from './edit-hero'
import makeRemoveHero from './remove-hero'
import makeListHeroes from './list-heroes'
import { verifyInfo } from '../../_helpers'

import heroesDb from '../data-access'

const addHero = makeAddHero({ heroesDb, verifyInfo })
const editHero = makeEditHero({ heroesDb, verifyInfo })
const listHeroes = makeListHeroes({ heroesDb })
const removeHero = makeRemoveHero({ heroesDb, verifyInfo })

const heroService = Object.freeze({
  addHero,
  editHero,
  listHeroes,
  removeHero
})

export default heroService
export { addHero, editHero, listHeroes, removeHero }
