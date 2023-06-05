const { Schema, Types, model } = require("mongoose");

const goalSchema = new Schema(
  {
    orgId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, default: null },
    teamId: { type: Types.ObjectId, default: null },
    active: { type: Boolean, default: true },
    type: { type: Number, default: 0, min: 0, max: 2 },
    objective: { type: String, required: true },
    owner: { type: Types.ObjectId, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: Number, default: 0, min: 0, max: 3 },
    keyResults: [
      {
        type: Object,
        _id: false,
        title: String,
        status: { type: Number, default: 0, min: 0, max: 1 },
      },
    ],
    parentGoal: { type: Types.ObjectId, default: null },
  },
  { timestamps: true }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
