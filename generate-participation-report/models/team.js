const { Schema, Types, model } = require("mongoose");

const teamSchema = new Schema(
  {
    orgId: { type: Types.ObjectId, required: true },
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    subTeams: { type: Number, default: 0 },
    color: { type: Number, default: 0, min: 0, max: 3 },
    parentTeam: { type: Types.ObjectId, default: null, ref: "Team" },
    manager: { type: Types.ObjectId },
    members: [{ type: Types.ObjectId }],
    focusedMetrics: [{ type: String }], // For survey reports
  },
  { timestamps: true }
);

const Team = model("Team", teamSchema);

module.exports = Team;
