export default function buildMakeHero ({ Id, makePartner, makeSkill, makeScores }) {
  return function makeHero ({
    id = Id.makeId(),
    name,
    nickName,
    avatar = '',
    bgBanner = '',
    categories,
    scores = {},
    skills = [],
    vItems = [],
    vItemsTips = '',
    dItems = [],
    dItemsTips = '',
    usageTips = '',
    battleTips = '',
    teamTips = '',
    partners = []
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Hero 需包含有效id')
    }
    if (!name) {
      throw new Error('Hero 需包含名称')
    }
    if (!nickName) {
      throw new Error('Hero 需包含昵称')
    }
    if (!categories) {
      throw new Error('Hero 需要分类别')
    }
    if (!Array.isArray(categories)) {
      throw new Error('Hero 各分类包含在数组里')
    }
    if (!categories.every(id => Id.isValidId(id))) {
      throw new Error('Hero 分类数据必须为 id 值')
    }
    if (!Array.isArray(skills)) {
      throw new Error('Hero 各技能包含在数组里')
    }
    if (!Array.isArray(vItems)) {
      throw new Error('Hero 顺丰出装包含在数组里')
    }
    if (!vItems.every(id => Id.isValidId(id))) {
      throw new Error('Hero 顺丰出装数据必须为 id 值')
    }
    if (!Array.isArray(dItems)) {
      throw new Error('Hero 逆风出装包含在数组里')
    }
    if (!dItems.every(id => Id.isValidId(id))) {
      throw new Error('Hero 逆风出装数据必须为 id 值')
    }
    if (!Array.isArray(partners)) {
      throw new Error('Hero 搭档包含在数组里')
    }

    const validScores = makeScores(scores)
    const validSkills = skills.map(makeSkill)
    const validPartners = partners.map(makePartner)

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getNickName: () => nickName,
      getAvatar: () => avatar,
      getBgBanner: () => bgBanner,
      getCategories: () => categories,
      getScores: () => validScores,
      getSkills: () => validSkills,
      getVItems: () => vItems,
      getVItemsTips: () => vItemsTips,
      getDItems: () => dItems,
      getDItemsTips: () => dItemsTips,
      getUsageTips: () => usageTips,
      getBattleTips: () => battleTips,
      getTeamTips: () => teamTips,
      getPartners: () => validPartners
    })
  }
}
