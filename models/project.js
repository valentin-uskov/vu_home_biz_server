const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    budget: Number,
    currencyId: String
});

module.exports = mongoose.model('Project', projectSchema);