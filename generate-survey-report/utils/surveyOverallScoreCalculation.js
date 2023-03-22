const surveyOverallScoreCalculation = (metricsObject) => {
    let metricsWithValue = 0
    if (metricsObject.happiness.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.relationWithManager.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.recognition.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.feedback.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.personalGrowth.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.alignment.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.satisfaction.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.relationWithPeers.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.wellness.overall > 0) metricsWithValue = metricsWithValue + 1
    if (metricsObject.ambassadorship.overall > 0) metricsWithValue = metricsWithValue + 1

    const overallScore =
        metricsWithValue > 0
            ? Number(
                  Number(
                      (metricsObject.happiness.overall +
                          metricsObject.relationWithManager.overall +
                          metricsObject.recognition.overall +
                          metricsObject.feedback.overall +
                          metricsObject.personalGrowth.overall +
                          metricsObject.alignment.overall +
                          metricsObject.satisfaction.overall +
                          metricsObject.relationWithPeers.overall +
                          metricsObject.wellness.overall +
                          metricsObject.ambassadorship.overall) /
                          metricsWithValue
                  ).toFixed(1)
              )
            : 0

    return overallScore
}

module.exports = surveyOverallScoreCalculation
