const { Schema, Types, model } = require("mongoose");

const questionSchema = new Schema(
  {
    active: { type: Boolean, default: true },
    quesText: { type: String, required: true },
    type: { type: Number, required: true, min: 0, max: 2 },
    category: { type: Types.ObjectId, required: true },
    subCategory: { type: Types.ObjectId, required: true },
    isfeedback: { type: Boolean, default: false },
    feedbackQues: { type: String, default: null },
  },
  { timestamps: true }
);

const Question = model("Question", questionSchema);

module.exports = Question;
