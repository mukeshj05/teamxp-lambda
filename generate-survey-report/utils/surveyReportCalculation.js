const happinessMetricsCalculation = require("./metricsCalculation/happiness");
const relationWithManagerMetricsCalculation = require("./metricsCalculation/relationWithManager");
const recognitionMetricsCalculation = require("./metricsCalculation/recognition");
const feedbackMetricsCalculation = require("./metricsCalculation/feedback");
const personalGrowthMetricsCalculation = require("./metricsCalculation/personalGrowth");
const alignmentMetricsCalculation = require("./metricsCalculation/alignment");
const satisfactionMetricsCalculation = require("./metricsCalculation/satisfaction");
const relationWithPeersMetricsCalculation = require("./metricsCalculation/relationWithPeers");
const wellnessMetricsCalculation = require("./metricsCalculation/wellness");
const ambassadorshipMetricsCalculation = require("./metricsCalculation/ambassadorship");

const surveyReportCalculation = (metricsObject, changeObject, changeObjectId, prevReportObject, prevReportObjectId) => {
  ////////////////////////////////////////////////////////////////////////////
  // Happiness
  metricsObject.happiness = happinessMetricsCalculation(
    metricsObject.happiness,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Relation With Manager
  metricsObject.relationWithManager = relationWithManagerMetricsCalculation(
    metricsObject.relationWithManager,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Recognition
  metricsObject.recognition = recognitionMetricsCalculation(
    metricsObject.recognition,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Feedback
  metricsObject.feedback = feedbackMetricsCalculation(
    metricsObject.feedback,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Personal Growth
  metricsObject.personalGrowth = personalGrowthMetricsCalculation(
    metricsObject.personalGrowth,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Alignment
  metricsObject.alignment = alignmentMetricsCalculation(
    metricsObject.alignment,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Satisfaction
  metricsObject.satisfaction = satisfactionMetricsCalculation(
    metricsObject.satisfaction,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Relation With Peers
  metricsObject.relationWithPeers = relationWithPeersMetricsCalculation(
    metricsObject.relationWithPeers,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Wellness
  metricsObject.wellness = wellnessMetricsCalculation(
    metricsObject.wellness,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  ////////////////////////////////////////////////////////////////////////////
  // Ambassadorship
  metricsObject.ambassadorship = ambassadorshipMetricsCalculation(
    metricsObject.ambassadorship,
    changeObject,
    changeObjectId,
    prevReportObject,
    prevReportObjectId
  );

  return metricsObject;
};

module.exports = surveyReportCalculation;
