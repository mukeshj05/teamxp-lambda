const surveyOverallScoreCalculationNew = (metricsObject) => {
  let metricsWithValue = 0;

  Object.keys(metricsObject).forEach((metric) => {
    if (metricsObject[metric].overall > 0)
      metricsWithValue = metricsWithValue + 1;
  });

  const overallScore =
    metricsWithValue > 0
      ? Number(
          Number(
            Object.keys(metricsObject).reduce(
              (sum, cur) => sum + metricsObject[cur].overall,
              0
            ) / metricsWithValue
          ).toFixed(1)
        )
      : 0;

  return overallScore;
};

module.exports = surveyOverallScoreCalculationNew;
