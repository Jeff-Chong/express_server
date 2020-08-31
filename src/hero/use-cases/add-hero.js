import makeHero from '../index'
export default function makeAddHero ({ heroesDb, verifyInfo }) {
  return async function addHero ({ authInfo, ...dataInfo } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------

    const hero = makeHero(dataInfo)
    const exists = await heroesDb.findByName({ name: hero.getName() })
    if (exists) {
      throw new Error('英雄已经存在数据库')
    }

    const scores = hero.getScores()
    const skills = hero.getSkills()
    const partners = hero.getPartners()

    const skillsData = []
    skills.forEach(skill => {
      skillsData.push({
        icon: skill.getIcon(),
        name: skill.getName(),
        cost: skill.getCost(),
        tips: skill.getTips(),
        freeze: skill.getFreeze(),
        description: skill.getDescription()
      })
    })

    const partnersData = []
    partners.forEach(partner => {
      partnersData.push({
        hero: partner.getHero(),
        description: partner.getDescription()
      })
    })

    return heroesDb.insert({
      id: hero.getId(),
      name: hero.getName(),
      nickName: hero.getNickName(),
      avatar: hero.getAvatar(),
      bgBanner: hero.getBgBanner(),
      scores: {
        difficult: scores.getDifficult(),
        skills: scores.getSkills(),
        attack: scores.getAttack(),
        survive: scores.getSurvive()
      },
      categories: hero.getCategories(),
      vItems: hero.getVItems(),
      vItemsTips: hero.getVItemsTips(),
      dItems: hero.getDItems(),
      dItemsTips: hero.getDItemsTips(),
      usageTips: hero.getUsageTips(),
      battleTips: hero.getBattleTips(),
      teamTips: hero.getTeamTips(),
      skills: skillsData,
      partners: partnersData
    })
  }
}
