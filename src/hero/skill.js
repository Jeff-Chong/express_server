export default function buildMakeSkill () {
  return function makeSkill ({
    name,
    tips = '',
    icon = '',
    cost = 0,
    freeze = '',
    description = ''
  } = {}) {
    if (!name) {
      throw new Error('技能需要包含名称')
    }

    return Object.freeze({
      getName: () => name,
      getTips: () => tips,
      getIcon: () => icon,
      getCost: () => cost,
      getFreeze: () => freeze,
      getDescription: () => description
    })
  }
}
