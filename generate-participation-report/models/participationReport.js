const { Schema, Types, model } = require("mongoose");

const participationReportSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    orgId: { type: Types.ObjectId, required: true },
    teamId: { type: Types.ObjectId, default: null },
    for: { type: String, default: "O", enum: ["O", "T"] }, // O = Organisation, T = Team
    date: { type: Date, default: Date.now },
    totalUsers: { type: Number, default: 0 },
    participatedUsers: { type: Number, default: 0 }, // Last 14 days
    participationPer: { type: Number, default: 0 }, // Participation Rate
  },
  { timestamps: true }
);

const ParticipationReport = model("ParticipationReport", participationReportSchema);

module.exports = ParticipationReport;
