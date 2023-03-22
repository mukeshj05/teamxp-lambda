const happinessMetricsCalculation = (happinessObj, changeObj, changeObjId, prevReportObj, prevReportObjId) => {
    ////////////////////////////////////////////////////////////////////////////
    // Happiness At Work
    if (changeObj[changeObjId].happinessAtWork && changeObj[changeObjId].happinessAtWork.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            happinessObj.happinessAtWork = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.happiness.happinessAtWork +
                        changeObj[changeObjId].happinessAtWork.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].happinessAtWork.length) /
                        2
                ).toFixed(1)
            )
        } else {
            happinessObj.happinessAtWork = Number(
                Number(
                    changeObj[changeObjId].happinessAtWork.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].happinessAtWork.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            happinessObj.happinessAtWork = Number(
                Number(prevReportObj[prevReportObjId].metrics.happiness.happinessAtWork).toFixed(1)
            )
        } else {
            happinessObj.happinessAtWork = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Work Life Balance
    if (changeObj[changeObjId].workLifeBalance && changeObj[changeObjId].workLifeBalance.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            happinessObj.workLifeBalance = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.happiness.workLifeBalance +
                        changeObj[changeObjId].workLifeBalance.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].workLifeBalance.length) /
                        2
                ).toFixed(1)
            )
        } else {
            happinessObj.workLifeBalance = Number(
                Number(
                    changeObj[changeObjId].workLifeBalance.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].workLifeBalance.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            happinessObj.workLifeBalance = Number(
                Number(prevReportObj[prevReportObjId].metrics.happiness.workLifeBalance).toFixed(1)
            )
        } else {
            happinessObj.workLifeBalance = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (happinessObj.happinessAtWork > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (happinessObj.workLifeBalance > 0) subMetricsWithValue = subMetricsWithValue + 1

    happinessObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number((happinessObj.happinessAtWork + happinessObj.workLifeBalance) / subMetricsWithValue).toFixed(1)
              )
            : 0

    return happinessObj
}

module.exports = happinessMetricsCalculation
