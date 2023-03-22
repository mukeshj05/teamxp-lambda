const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    orgId: { type: Types.ObjectId, required: true },
    name: { type: String, default: null },
    avatar: { type: Number, min: 0, max: 12, default: 0 },
    phone: { type: Number, required: true, min: 6000000000, max: 9999999999 },
    email: { type: String, default: null },
    gender: { type: Number, min: 0, max: 2, default: null }, // Male: 0, Female: 1, Other: 2
    dateOfBirth: { type: Date, default: null },
    jobTitle: { type: String, default: null },
    department: { type: Number, min: 0, max: 9, default: null },
    dateOfHire: { type: Date, default: null },
    surveyDay: { type: Number, min: 0, max: 6, default: 0 }, // Starting from monday, i.e. monday = 0
    surveyTime: { type: Number, default: 540 },
    teams: [
      {
        type: Object,
        _id: false,
        teamId: Types.ObjectId,
        userType: { type: String, enum: ["A", "M", "E"] }, // Admin: A, Manager: M, Employee: E
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
