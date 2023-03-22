const relationWithManagerMetricsCalculation = (
    relationWithManagerObj,
    changeObj,
    changeObjId,
    prevReportObj,
    prevReportObjId
) => {
    ////////////////////////////////////////////////////////////////////////////
    // Collaboration With Manager
    if (changeObj[changeObjId].collaborationWithManager && changeObj[changeObjId].collaborationWithManager.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            relationWithManagerObj.collaborationWithManager = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.relationWithManager.collaborationWithManager +
                        changeObj[changeObjId].collaborationWithManager.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].collaborationWithManager.length) /
                        2
                ).toFixed(1)
            )
        } else {
            relationWithManagerObj.collaborationWithManager = Number(
                Number(
                    changeObj[changeObjId].collaborationWithManager.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].collaborationWithManager.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            relationWithManagerObj.collaborationWithManager = Number(
                Number(prevReportObj[prevReportObjId].metrics.relationWithManager.collaborationWithManager).toFixed(1)
            )
        } else {
            relationWithManagerObj.collaborationWithManager = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Trust With Manager
    if (changeObj[changeObjId].trustWithManager && changeObj[changeObjId].trustWithManager.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            relationWithManagerObj.trustWithManager = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.relationWithManager.trustWithManager +
                        changeObj[changeObjId].trustWithManager.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].trustWithManager.length) /
                        2
                ).toFixed(1)
            )
        } else {
            relationWithManagerObj.trustWithManager = Number(
                Number(
                    changeObj[changeObjId].trustWithManager.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].trustWithManager.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            relationWithManagerObj.trustWithManager = Number(
                Number(prevReportObj[prevReportObjId].metrics.relationWithManager.trustWithManager).toFixed(1)
            )
        } else {
            relationWithManagerObj.trustWithManager = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Communication With Manager
    if (changeObj[changeObjId].communicationWithManager && changeObj[changeObjId].communicationWithManager.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            relationWithManagerObj.communicationWithManager = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.relationWithManager.communicationWithManager +
                        changeObj[changeObjId].communicationWithManager.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].communicationWithManager.length) /
                        2
                ).toFixed(1)
            )
        } else {
            relationWithManagerObj.communicationWithManager = Number(
                Number(
                    changeObj[changeObjId].communicationWithManager.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].communicationWithManager.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            relationWithManagerObj.communicationWithManager = Number(
                Number(prevReportObj[prevReportObjId].metrics.relationWithManager.communicationWithManager).toFixed(1)
            )
        } else {
            relationWithManagerObj.communicationWithManager = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (relationWithManagerObj.collaborationWithManager > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (relationWithManagerObj.trustWithManager > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (relationWithManagerObj.communicationWithManager > 0) subMetricsWithValue = subMetricsWithValue + 1

    relationWithManagerObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (relationWithManagerObj.collaborationWithManager +
                          relationWithManagerObj.trustWithManager +
                          relationWithManagerObj.communicationWithManager) /
                          subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return relationWithManagerObj
}

module.exports = relationWithManagerMetricsCalculation
