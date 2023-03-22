const ambassadorshipMetricsCalculation = (
    ambassadorshipObj,
    changeObj,
    changeObjId,
    prevReportObj,
    prevReportObjId
) => {
    ////////////////////////////////////////////////////////////////////////////
    // Championing
    if (changeObj[changeObjId].championing && changeObj[changeObjId].championing.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            ambassadorshipObj.championing = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.ambassadorship.championing +
                        changeObj[changeObjId].championing.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].championing.length) /
                        2
                ).toFixed(1)
            )
        } else {
            ambassadorshipObj.championing = Number(
                Number(
                    changeObj[changeObjId].championing.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].championing.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            ambassadorshipObj.championing = Number(
                Number(prevReportObj[prevReportObjId].metrics.ambassadorship.championing).toFixed(1)
            )
        } else {
            ambassadorshipObj.championing = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Pride
    if (changeObj[changeObjId].pride && changeObj[changeObjId].pride.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            ambassadorshipObj.pride = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.ambassadorship.pride +
                        changeObj[changeObjId].pride.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].pride.length) /
                        2
                ).toFixed(1)
            )
        } else {
            ambassadorshipObj.pride = Number(
                Number(
                    changeObj[changeObjId].pride.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].pride.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            ambassadorshipObj.pride = Number(
                Number(prevReportObj[prevReportObjId].metrics.ambassadorship.pride).toFixed(1)
            )
        } else {
            ambassadorshipObj.pride = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (ambassadorshipObj.championing > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (ambassadorshipObj.pride > 0) subMetricsWithValue = subMetricsWithValue + 1

    ambassadorshipObj.overall =
        subMetricsWithValue > 0
            ? Number(Number((ambassadorshipObj.championing + ambassadorshipObj.pride) / subMetricsWithValue).toFixed(1))
            : 0

    return ambassadorshipObj
}

module.exports = ambassadorshipMetricsCalculation
