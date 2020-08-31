export default function buildMakePartner ({ Id }) {
  return function makePartner ({
    hero,
    description = ''
  } = {}) {
    if (!hero) {
      throw new Error('搭档必须包含 hero 属性')
    }

    if (!Id.isValidId(hero)) {
      throw new Error('搭档 hero 属性必须为有效 id 值')
    }

    return Object.freeze({
      getHero: () => hero,
      getDescription: () => description
    })
  }
}
