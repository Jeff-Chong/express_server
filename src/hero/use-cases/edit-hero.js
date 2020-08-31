import makeHero from '../index'
export default function makeEditItem ({ heroesDb, verifyInfo }) {
  return async function editItem ({ authInfo, id, ...changes } = {}) {
    // 验证权限
    verifyInfo(authInfo)
    // -------
    if (!id) {
      throw new Error('id 属性不能忽略')
    }
    const existing = await heroesDb.findById({ id })
    if (!existing) {
      throw new RangeError('英雄未找到')
    }

    const hero = makeHero({ ...existing, ...changes })

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

    const updated = await heroesDb.update({
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
    if (!updated) {
      throw new Error('更新英雄失败')
    }
    return { ...existing, ...updated }
  }
}
