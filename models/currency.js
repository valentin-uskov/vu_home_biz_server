const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    name: String,
    sign: String,
});

module.exports = mongoose.model('Currency', currencySchema);