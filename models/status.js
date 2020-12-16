const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Status', statusSchema);