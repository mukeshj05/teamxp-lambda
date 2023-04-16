const { Schema, Types, model } = require("mongoose");

const surveyReportSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    orgId: { type: Types.ObjectId, required: true },
    teamId: { type: Types.ObjectId, default: null },
    for: { type: String, default: "O", enum: ["O", "T"] }, // O = Organisation, T = Team
    date: { type: Date, default: Date.now },
    overall: { type: Number, default: 0 }, // Overall Score
    metrics: { type: Object },
    // metrics: {
    //   happiness: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     happinessAtWork: { type: Number, default: 0 },
    //     workLifeBalance: { type: Number, default: 0 },
    //   },
    //   relationWithManager: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     collaborationWithManager: { type: Number, default: 0 },
    //     trustWithManager: { type: Number, default: 0 },
    //     communicationWithManager: { type: Number, default: 0 },
    //   },
    //   recognition: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     recognitionQuality: { type: Number, default: 0 },
    //     recognitionFrequency: { type: Number, default: 0 },
    //   },
    //   feedback: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     feedbackQuality: { type: Number, default: 0 },
    //     feedbackFrequency: { type: Number, default: 0 },
    //     suggestionsForOrganization: { type: Number, default: 0 },
    //   },
    //   personalGrowth: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     autonomy: { type: Number, default: 0 },
    //     mastery: { type: Number, default: 0 },
    //     purpose: { type: Number, default: 0 },
    //   },
    //   alignment: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     values: { type: Number, default: 0 },
    //     visionAndMission: { type: Number, default: 0 },
    //     ethicsSocialResponsibility: { type: Number, default: 0 },
    //   },
    //   satisfaction: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     fairness: { type: Number, default: 0 },
    //     roleWithinOrganization: { type: Number, default: 0 },
    //     workEnvironment: { type: Number, default: 0 },
    //   },
    //   relationWithPeers: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     collaborationWithPeers: { type: Number, default: 0 },
    //     trustWithPeers: { type: Number, default: 0 },
    //     communicationWithPeers: { type: Number, default: 0 },
    //   },
    //   wellness: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     stress: { type: Number, default: 0 },
    //     personalHealth: { type: Number, default: 0 },
    //   },
    //   ambassadorship: {
    //     type: Object,
    //     _id: false,
    //     overall: { type: Number, default: 0 },
    //     championing: { type: Number, default: 0 },
    //     pride: { type: Number, default: 0 },
    //   },
    // },
  },
  { timestamps: true }
);

const SurveyReport = model("SurveyReport", surveyReportSchema);

module.exports = SurveyReport;
