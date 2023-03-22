const eNPSScoreCalculation = (enpsObject) => {
  const eNPS = {};

  const totalPoints = enpsObject.promoters + enpsObject.passives + enpsObject.detractors + enpsObject.skipped;
  eNPS.promoters = Number(Number((enpsObject.promoters * 100) / totalPoints).toFixed(2));
  eNPS.passives = Number(Number((enpsObject.passives * 100) / totalPoints).toFixed(2));
  eNPS.detractors = Number(Number((enpsObject.detractors * 100) / totalPoints).toFixed(2));
  eNPS.skipped = Number(Number((enpsObject.skipped * 100) / totalPoints).toFixed(2));
  eNPS.overall = eNPS.promoters - eNPS.detractors;

  return eNPS;
};

module.exports = eNPSScoreCalculation;
