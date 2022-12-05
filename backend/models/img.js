const mongoose = require('mongoose');

const ImgSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true},
    description: { type: String, required: true},
    views: { type: Number , default:0},
}, { collection: 'allimg' })

const model = mongoose.model('ImgSchema', ImgSchema);

module.exports = model;