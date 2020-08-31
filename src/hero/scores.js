export default function buildMakeScores () {
  return function makeSkill ({
    difficult = 1,
    skills = 1,
    attack = 1,
    survive = 1
  } = {}) {
    return Object.freeze({
      getDifficult: () => difficult,
      getSkills: () => skills,
      getAttack: () => attack,
      getSurvive: () => survive
    })
  }
}
