const alignmentMetricsCalculation = (alignmentObj, changeObj, changeObjId, prevReportObj, prevReportObjId) => {
    ////////////////////////////////////////////////////////////////////////////
    // Values
    if (changeObj[changeObjId].values && changeObj[changeObjId].values.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            alignmentObj.values = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.alignment.values +
                        changeObj[changeObjId].values.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].values.length) /
                        2
                ).toFixed(1)
            )
        } else {
            alignmentObj.values = Number(
                Number(
                    changeObj[changeObjId].values.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].values.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            alignmentObj.values = Number(Number(prevReportObj[prevReportObjId].metrics.alignment.values).toFixed(1))
        } else {
            alignmentObj.values = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Vision And Mission
    if (changeObj[changeObjId].visionAndMission && changeObj[changeObjId].visionAndMission.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            alignmentObj.visionAndMission = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.alignment.visionAndMission +
                        changeObj[changeObjId].visionAndMission.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].visionAndMission.length) /
                        2
                ).toFixed(1)
            )
        } else {
            alignmentObj.visionAndMission = Number(
                Number(
                    changeObj[changeObjId].visionAndMission.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].visionAndMission.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            alignmentObj.visionAndMission = Number(
                Number(prevReportObj[prevReportObjId].metrics.alignment.visionAndMission).toFixed(1)
            )
        } else {
            alignmentObj.visionAndMission = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Ethics And Social Responsibility
    if (
        changeObj[changeObjId].ethicsSocialResponsibility &&
        changeObj[changeObjId].ethicsSocialResponsibility.length > 0
    ) {
        if (prevReportObj[prevReportObjId]) {
            alignmentObj.ethicsSocialResponsibility = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.alignment.ethicsSocialResponsibility +
                        changeObj[changeObjId].ethicsSocialResponsibility.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].ethicsSocialResponsibility.length) /
                        2
                ).toFixed(1)
            )
        } else {
            alignmentObj.ethicsSocialResponsibility = Number(
                Number(
                    changeObj[changeObjId].ethicsSocialResponsibility.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].ethicsSocialResponsibility.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            alignmentObj.ethicsSocialResponsibility = Number(
                Number(prevReportObj[prevReportObjId].metrics.alignment.ethicsSocialResponsibility).toFixed(1)
            )
        } else {
            alignmentObj.ethicsSocialResponsibility = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (alignmentObj.values > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (alignmentObj.visionAndMission > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (alignmentObj.ethicsSocialResponsibility > 0) subMetricsWithValue = subMetricsWithValue + 1

    alignmentObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (alignmentObj.values + alignmentObj.visionAndMission + alignmentObj.ethicsSocialResponsibility) /
                          subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return alignmentObj
}

module.exports = alignmentMetricsCalculation
