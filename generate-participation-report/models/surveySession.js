const { Schema, Types, model } = require("mongoose");

const surveySessionSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    orgId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    surveyId: { type: Types.ObjectId, required: true },
    questions: [
      {
        type: Object,
        _id: false,
        quesId: Types.ObjectId,
        quesText: String,
        quesType: Number,
        category: Types.ObjectId,
        subCategory: Types.ObjectId,
        answer: Number,
      },
    ],
  },
  { timestamps: true }
);

const SurveySession = model("SurveySession", surveySessionSchema);

module.exports = SurveySession;
