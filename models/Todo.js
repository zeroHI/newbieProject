const mongoose = require('mongoose');

const padSchema = mongoose.Schema({
  tableNum: Number,
  menu: [String],
  payment: Boolean,
  allServed: Boolean
})

module.exports = mongoose.model('pad', padSchema);

