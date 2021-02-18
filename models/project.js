const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    id: String, /* Only for REDUX version of APP */
    name: String,
    budget: Number,
    currencyId: String
});

module.exports = mongoose.model('Project', projectSchema);