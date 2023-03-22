const personalGrowthMetricsCalculation = (
    personalGrowthObj,
    changeObj,
    changeObjId,
    prevReportObj,
    prevReportObjId
) => {
    ////////////////////////////////////////////////////////////////////////////
    // Autonomy
    if (changeObj[changeObjId].autonomy && changeObj[changeObjId].autonomy.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            personalGrowthObj.autonomy = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.personalGrowth.autonomy +
                        changeObj[changeObjId].autonomy.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].autonomy.length) /
                        2
                ).toFixed(1)
            )
        } else {
            personalGrowthObj.autonomy = Number(
                Number(
                    changeObj[changeObjId].autonomy.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].autonomy.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            personalGrowthObj.autonomy = Number(
                Number(prevReportObj[prevReportObjId].metrics.personalGrowth.autonomy).toFixed(1)
            )
        } else {
            personalGrowthObj.autonomy = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Mastery
    if (changeObj[changeObjId].mastery && changeObj[changeObjId].mastery.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            personalGrowthObj.mastery = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.personalGrowth.mastery +
                        changeObj[changeObjId].mastery.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].mastery.length) /
                        2
                ).toFixed(1)
            )
        } else {
            personalGrowthObj.mastery = Number(
                Number(
                    changeObj[changeObjId].mastery.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].mastery.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            personalGrowthObj.mastery = Number(
                Number(prevReportObj[prevReportObjId].metrics.personalGrowth.mastery).toFixed(1)
            )
        } else {
            personalGrowthObj.mastery = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Purpose
    if (changeObj[changeObjId].purpose && changeObj[changeObjId].purpose.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            personalGrowthObj.purpose = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.personalGrowth.purpose +
                        changeObj[changeObjId].purpose.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].purpose.length) /
                        2
                ).toFixed(1)
            )
        } else {
            personalGrowthObj.purpose = Number(
                Number(
                    changeObj[changeObjId].purpose.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].purpose.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            personalGrowthObj.purpose = Number(
                Number(prevReportObj[prevReportObjId].metrics.personalGrowth.purpose).toFixed(1)
            )
        } else {
            personalGrowthObj.purpose = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (personalGrowthObj.autonomy > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (personalGrowthObj.mastery > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (personalGrowthObj.purpose > 0) subMetricsWithValue = subMetricsWithValue + 1

    personalGrowthObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (personalGrowthObj.autonomy + personalGrowthObj.mastery + personalGrowthObj.purpose) /
                          subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return personalGrowthObj
}

module.exports = personalGrowthMetricsCalculation
