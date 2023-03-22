const { Schema, model } = require("mongoose");

const organisationSchema = new Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    phone: { type: Number, required: true, min: 6000000000, max: 9999999999 },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, default: null },
    focusedMetrics: [{ type: String }], // For survey reports
  },
  { timestamps: true }
);

const Organisation = model("Organisation", organisationSchema);

module.exports = Organisation;
