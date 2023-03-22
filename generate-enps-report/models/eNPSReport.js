const { Schema, Types, model } = require("mongoose");

const eNPSReportSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    orgId: { type: Types.ObjectId, required: true },
    teamId: { type: Types.ObjectId, default: null },
    for: { type: String, default: "O", enum: ["O", "T"] }, // O = Organisation, T = Team
    date: { type: Date, default: Date.now },
    eNPS: {
      type: Object,
      _id: false,
      overall: { type: Number, default: 0 },
      promoters: { type: Number, default: 0 },
      passives: { type: Number, default: 0 },
      detractors: { type: Number, default: 0 },
      skipped: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const ENPSReport = model("ENPSReport", eNPSReportSchema);

module.exports = ENPSReport;
