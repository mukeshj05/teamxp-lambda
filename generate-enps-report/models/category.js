const { Schema, Types, model } = require('mongoose')

const categorySchema = new Schema(
    {
        active: { type: Boolean, default: true },
        category: { type: String, required: true },
        parent: { type: Types.ObjectId, default: null },
        tag: { type: String, required: true },
        description: { type: String, default: null },
    },
    { timestamps: true }
)

const Category = model('Category', categorySchema)

module.exports = Category
