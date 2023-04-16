const surveyReportCalculationNew = (
  categories, // All Categories
  parentCateogries, // Parent categories except ENPS
  metricsObj, // Metrics of Report Array
  orgOrTeamChanges, // Changes added for organization and teams
  orgOrTeamId, // Id of organization and teams having changes
  prevReport, // Previous day reports object
  prevReportOrgOrTeamId // Id of organization and teams mentioned in preivous day reports object
) => {
  Object.keys(metricsObj).forEach((metric) => {
    // Get parent category
    const category = parentCateogries.find((el) => el.tag === metric);

    if (category) {
      // Get sub category tags of existing parent category
      const subMetricsTags = categories
        .filter((el) => el.parent?.toString() === category._id?.toString())
        .map((el) => el.tag);

      // Calculate report for each sub category tag
      subMetricsTags.forEach((subMetricTag) => {
        const subMetricsValueArray =
          orgOrTeamChanges[orgOrTeamId][subMetricTag];

        if (subMetricsValueArray && subMetricsValueArray.length > 0) {
          const subMetricsCurrentValue =
            subMetricsValueArray.reduce((sum, cur) => sum + cur, 0) /
            subMetricsValueArray.length;

          if (!!prevReport[prevReportOrgOrTeamId]) {
            const subMetricsPrevValue =
              prevReport[prevReportOrgOrTeamId].metrics[metric][subMetricTag];

            metricsObj[metric][subMetricTag] = Number(
              Number(
                (subMetricsPrevValue + subMetricsCurrentValue) / 2
              ).toFixed(1)
            );
          } else {
            metricsObj[metric][subMetricTag] = Number(
              Number(subMetricsCurrentValue).toFixed(1)
            );
          }
        } else {
          if (!!prevReport[prevReportOrgOrTeamId]) {
            metricsObj[metric][subMetricTag] = Number(
              Number(
                prevReport[prevReportOrgOrTeamId].metrics[metric][subMetricTag]
              ).toFixed(1)
            );
          } else {
            metricsObj[metric][subMetricTag] = 0;
          }
        }
      });

      // Calculate overall score for metric
      let subMetricsWithValue = 0;
      Object.values(metricsObj[metric]).forEach((el) => {
        if (el > 0) subMetricsWithValue = subMetricsWithValue + 1;
      });

      metricsObj[metric].overall =
        subMetricsWithValue > 0
          ? Number(
              Number(
                Object.values(metricsObj[metric]).reduce(
                  (sum, cur) => sum + cur,
                  0
                ) / subMetricsWithValue
              ).toFixed(1)
            )
          : 0;
    }
  });

  return metricsObj;
};

module.exports = surveyReportCalculationNew;
