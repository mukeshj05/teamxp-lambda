const relationWithPeersMetricsCalculation = (
    relationWithPeersObj,
    changeObj,
    changeObjId,
    prevReportObj,
    prevReportObjId
) => {
    ////////////////////////////////////////////////////////////////////////////
    // Collaboration With Peers
    if (changeObj[changeObjId].collaborationWithPeers && changeObj[changeObjId].collaborationWithPeers.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            relationWithPeersObj.collaborationWithPeers = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.relationWithPeers.collaborationWithPeers +
                        changeObj[changeObjId].collaborationWithPeers.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].collaborationWithPeers.length) /
                        2
                ).toFixed(1)
            )
        } else {
            relationWithPeersObj.collaborationWithPeers = Number(
                Number(
                    changeObj[changeObjId].collaborationWithPeers.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].collaborationWithPeers.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            relationWithPeersObj.collaborationWithPeers = Number(
                Number(prevReportObj[prevReportObjId].metrics.relationWithPeers.collaborationWithPeers).toFixed(1)
            )
        } else {
            relationWithPeersObj.collaborationWithPeers = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Trust With Peers
    if (changeObj[changeObjId].trustWithPeers && changeObj[changeObjId].trustWithPeers.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            relationWithPeersObj.trustWithPeers = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.relationWithPeers.trustWithPeers +
                        changeObj[changeObjId].trustWithPeers.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].trustWithPeers.length) /
                        2
                ).toFixed(1)
            )
        } else {
            relationWithPeersObj.trustWithPeers = Number(
                Number(
                    changeObj[changeObjId].trustWithPeers.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].trustWithPeers.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            relationWithPeersObj.trustWithPeers = Number(
                Number(prevReportObj[prevReportObjId].metrics.relationWithPeers.trustWithPeers).toFixed(1)
            )
        } else {
            relationWithPeersObj.trustWithPeers = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Communication With Peers
    if (changeObj[changeObjId].communicationWithPeers && changeObj[changeObjId].communicationWithPeers.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            relationWithPeersObj.communicationWithPeers = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.relationWithPeers.communicationWithPeers +
                        changeObj[changeObjId].communicationWithPeers.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].communicationWithPeers.length) /
                        2
                ).toFixed(1)
            )
        } else {
            relationWithPeersObj.communicationWithPeers = Number(
                Number(
                    changeObj[changeObjId].communicationWithPeers.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].communicationWithPeers.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            relationWithPeersObj.communicationWithPeers = Number(
                Number(prevReportObj[prevReportObjId].metrics.relationWithPeers.communicationWithPeers).toFixed(1)
            )
        } else {
            relationWithPeersObj.communicationWithPeers = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (relationWithPeersObj.collaborationWithPeers > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (relationWithPeersObj.trustWithPeers > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (relationWithPeersObj.communicationWithPeers > 0) subMetricsWithValue = subMetricsWithValue + 1

    relationWithPeersObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (relationWithPeersObj.collaborationWithPeers +
                          relationWithPeersObj.trustWithPeers +
                          relationWithPeersObj.communicationWithPeers) /
                          subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return relationWithPeersObj
}

module.exports = relationWithPeersMetricsCalculation
