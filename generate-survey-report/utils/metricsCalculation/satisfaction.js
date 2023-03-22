const satisfactionMetricsCalculation = (satisfactionObj, changeObj, changeObjId, prevReportObj, prevReportObjId) => {
    ////////////////////////////////////////////////////////////////////////////
    // Fairness
    if (changeObj[changeObjId].fairness && changeObj[changeObjId].fairness.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            satisfactionObj.fairness = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.satisfaction.fairness +
                        changeObj[changeObjId].fairness.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].fairness.length) /
                        2
                ).toFixed(1)
            )
        } else {
            satisfactionObj.fairness = Number(
                Number(
                    changeObj[changeObjId].fairness.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].fairness.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            satisfactionObj.fairness = Number(
                Number(prevReportObj[prevReportObjId].metrics.satisfaction.fairness).toFixed(1)
            )
        } else {
            satisfactionObj.fairness = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Role Within Organization
    if (changeObj[changeObjId].roleWithinOrganization && changeObj[changeObjId].roleWithinOrganization.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            satisfactionObj.roleWithinOrganization = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.satisfaction.roleWithinOrganization +
                        changeObj[changeObjId].roleWithinOrganization.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].roleWithinOrganization.length) /
                        2
                ).toFixed(1)
            )
        } else {
            satisfactionObj.roleWithinOrganization = Number(
                Number(
                    changeObj[changeObjId].roleWithinOrganization.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].roleWithinOrganization.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            satisfactionObj.roleWithinOrganization = Number(
                Number(prevReportObj[prevReportObjId].metrics.satisfaction.roleWithinOrganization).toFixed(1)
            )
        } else {
            satisfactionObj.roleWithinOrganization = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Work Environment
    if (changeObj[changeObjId].workEnvironment && changeObj[changeObjId].workEnvironment.length > 0) {
        if (prevReportObj[prevReportObjId]) {
            satisfactionObj.workEnvironment = Number(
                Number(
                    (prevReportObj[prevReportObjId].metrics.satisfaction.workEnvironment +
                        changeObj[changeObjId].workEnvironment.reduce((sum, cur) => sum + cur, 0) /
                            changeObj[changeObjId].workEnvironment.length) /
                        2
                ).toFixed(1)
            )
        } else {
            satisfactionObj.workEnvironment = Number(
                Number(
                    changeObj[changeObjId].workEnvironment.reduce((sum, cur) => sum + cur, 0) /
                        changeObj[changeObjId].workEnvironment.length
                ).toFixed(1)
            )
        }
    } else {
        if (prevReportObj[prevReportObjId]) {
            satisfactionObj.workEnvironment = Number(
                Number(prevReportObj[prevReportObjId].metrics.satisfaction.workEnvironment).toFixed(1)
            )
        } else {
            satisfactionObj.workEnvironment = 0
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Overall
    let subMetricsWithValue = 0
    if (satisfactionObj.fairness > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (satisfactionObj.roleWithinOrganization > 0) subMetricsWithValue = subMetricsWithValue + 1
    if (satisfactionObj.workEnvironment > 0) subMetricsWithValue = subMetricsWithValue + 1

    satisfactionObj.overall =
        subMetricsWithValue > 0
            ? Number(
                  Number(
                      (satisfactionObj.fairness +
                          satisfactionObj.roleWithinOrganization +
                          satisfactionObj.workEnvironment) /
                          subMetricsWithValue
                  ).toFixed(1)
              )
            : 0

    return satisfactionObj
}

module.exports = satisfactionMetricsCalculation
