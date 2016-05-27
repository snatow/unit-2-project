// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMAS
var testSchema = new mongoose.Schema({
  word: String,
  image: String
});

// Map it through Mongoose
var Test = mongoose.model('Test', testSchema);


module.exports = Test;