const recognitionMetricsCalculation = (recognitionObj, changeObj, changeObjId, prevReportObj, prevReportObjId) => {
    ////////////////////////////////////////////////////////////////////////////
    // Recognition Quality
    if (changeObj[changeObjId].recognitionQuality && changeObj[changeObjId].recognitionQuality.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            recognitionObj.recognitionQuality = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.recognition.recognitionQuality +
                        changeObj[changeObjId].recognitionQuality.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].recognitionQuality.length) /
                        2
                ).toFixed(1)
            )
        } else {
            recognitionObj.recognitionQuality = Number(
                Number(
                    changeObj[changeObjId].recognitionQuality.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].recognitionQuality.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            recognitionObj.recognitionQuality = Number(
                Number(prevReportObj[prevReportObjId].metrics.recognition.recognitionQuality).toFixed(1)
            )
        } else {
            recognitionObj.recognitionQuality = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Recognition Frequency
    if (changeObj[changeObjId].recognitionFrequency && changeObj[changeObjId].recognitionFrequency.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            recognitionObj.recognitionFrequency = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.recognition.recognitionFrequency +
                        changeObj[changeObjId].recognitionFrequency.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].recognitionFrequency.length) /
                        2
                ).toFixed(1)
            )
        } else {
            recognitionObj.recognitionFrequency = Number(
                Number(
                    changeObj[changeObjId].recognitionFrequency.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].recognitionFrequency.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            recognitionObj.recognitionFrequency = Number(
                Number(prevReportObj[prevReportObjId].metrics.recognition.recognitionFrequency).toFixed(1)
            )
        } else {
            recognitionObj.recognitionFrequency = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (recognitionObj.recognitionQuality > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (recognitionObj.recognitionFrequency > 0) subMetricsWithValue = subMetricsWithValue + 1

    recognitionObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (recognitionObj.recognitionQuality + recognitionObj.recognitionFrequency) / subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return recognitionObj
}

module.exports = recognitionMetricsCalculation
