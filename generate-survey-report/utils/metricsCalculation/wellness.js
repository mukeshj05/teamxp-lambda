const wellnessMetricsCalculation = (wellnessObj, changeObj, changeObjId, prevReportObj, prevReportObjId) => {
    ////////////////////////////////////////////////////////////////////////////
    // Stress
    if (changeObj[changeObjId].stress && changeObj[changeObjId].stress.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            wellnessObj.stress = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.wellness.stress +
                        changeObj[changeObjId].stress.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].stress.length) /
                        2
                ).toFixed(1)
            )
        } else {
            wellnessObj.stress = Number(
                Number(
                    changeObj[changeObjId].stress.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].stress.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            wellnessObj.stress = Number(Number(prevReportObj[prevReportObjId].metrics.wellness.stress).toFixed(1))
        } else {
            wellnessObj.stress = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Personal Health
    if (changeObj[changeObjId].personalHealth && changeObj[changeObjId].personalHealth.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            wellnessObj.personalHealth = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.wellness.personalHealth +
                        changeObj[changeObjId].personalHealth.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].personalHealth.length) /
                        2
                ).toFixed(1)
            )
        } else {
            wellnessObj.personalHealth = Number(
                Number(
                    changeObj[changeObjId].personalHealth.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].personalHealth.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            wellnessObj.personalHealth = Number(
                Number(prevReportObj[prevReportObjId].metrics.wellness.personalHealth).toFixed(1)
            )
        } else {
            wellnessObj.personalHealth = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (wellnessObj.stress > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (wellnessObj.personalHealth > 0) subMetricsWithValue = subMetricsWithValue + 1

    wellnessObj.overall =
        subMetricsWithValue > 0
            ? Number(Number((wellnessObj.stress + wellnessObj.personalHealth) / subMetricsWithValue).toFixed(1))
            : 0

    return wellnessObj
}

module.exports = wellnessMetricsCalculation
