export default function makeListHeroes ({ heroesDb }) {
  return async function listHeroes ({ id } = {}) {
    if (id) {
      const existing = await heroesDb.findById({ id })
      if (!existing) {
        throw new RangeError('物品未找到')
      }
      return existing
    }

    const heroes = await heroesDb.findAll()
    // 减少数据量
    const imperfectHeroes = heroes.map(hero => {
      return {
        id: hero.id,
        name: hero.name,
        nickName: hero.nickName,
        avatar: hero.avatar
      }
    })
    return imperfectHeroes
  }
}
