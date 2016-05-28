// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMAS
var form1Schema = new mongoose.Schema({
  title: String,
  noun1: String,
  image_noun1: String,
  adjective1: String,
  verb1: String, 
  adverb1: String,
  noun2: String,
  image_noun2: String,
  adjective2: String,
  pluralNoun1: String,
  pluralNoun2: String,
  pluralNoun3: String,
  partOfTheBody1: String,
  noun3: String,
  image_noun3: String,
  noun4: String,
  image_noun4: String,
  noun5: String,
  image_noun5: String,
  noun6: String,
  image_noun6: String,
  partOfTheBody2: String
});

// Map it through Mongoose
var Form1 = mongoose.model('Form1', form1Schema);


module.exports = Form1;