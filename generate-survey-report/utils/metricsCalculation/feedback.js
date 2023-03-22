const feedbackMetricsCalculation = (feedbackObj, changeObj, changeObjId, prevReportObj, prevReportObjId) => {
    ////////////////////////////////////////////////////////////////////////////
    // Feedback Quality
    if (changeObj[changeObjId].feedbackQuality && changeObj[changeObjId].feedbackQuality.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            feedbackObj.feedbackQuality = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.feedback.feedbackQuality +
                        changeObj[changeObjId].feedbackQuality.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].feedbackQuality.length) /
                        2
                ).toFixed(1)
            )
        } else {
            feedbackObj.feedbackQuality = Number(
                Number(
                    changeObj[changeObjId].feedbackQuality.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].feedbackQuality.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            feedbackObj.feedbackQuality = Number(
                Number(prevReportObj[prevReportObjId].metrics.feedback.feedbackQuality).toFixed(1)
            )
        } else {
            feedbackObj.feedbackQuality = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Feedback Frequency
    if (changeObj[changeObjId].feedbackFrequency && changeObj[changeObjId].feedbackFrequency.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            feedbackObj.feedbackFrequency = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.feedback.feedbackFrequency +
                        changeObj[changeObjId].feedbackFrequency.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].feedbackFrequency.length) /
                        2
                ).toFixed(1)
            )
        } else {
            feedbackObj.feedbackFrequency = Number(
                Number(
                    changeObj[changeObjId].feedbackFrequency.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].feedbackFrequency.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            feedbackObj.feedbackFrequency = Number(
                Number(prevReportObj[prevReportObjId].metrics.feedback.feedbackFrequency).toFixed(1)
            )
        } else {
            feedbackObj.feedbackFrequency = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Suggestions For Organization
    if (
        changeObj[changeObjId].suggestionsForOrganization &&
        changeObj[changeObjId].suggestionsForOrganization.length > 0
    ) {
        if (prevReportObj[prevReportObjId]) {
            feedbackObj.suggestionsForOrganization = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.feedback.suggestionsForOrganization +
                        changeObj[changeObjId].suggestionsForOrganization.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].suggestionsForOrganization.length) /
                        2
                ).toFixed(1)
            )
        } else {
            feedbackObj.suggestionsForOrganization = Number(
                Number(
                    changeObj[changeObjId].suggestionsForOrganization.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].suggestionsForOrganization.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            feedbackObj.suggestionsForOrganization = Number(
                Number(prevReportObj[prevReportObjId].metrics.feedback.suggestionsForOrganization).toFixed(1)
            )
        } else {
            feedbackObj.suggestionsForOrganization = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (feedbackObj.feedbackQuality > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (feedbackObj.feedbackFrequency > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (feedbackObj.suggestionsForOrganization > 0) subMetricsWithValue = subMetricsWithValue + 1

    feedbackObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (feedbackObj.feedbackQuality +
                          feedbackObj.feedbackFrequency +
                          feedbackObj.suggestionsForOrganization) /
                          subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return feedbackObj
}

module.exports = feedbackMetricsCalculation
