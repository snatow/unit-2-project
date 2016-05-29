// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMAS
var form1Schema = new mongoose.Schema({
  title: String,
  noun1: String,
  noun2: String,
  noun3: String,
  noun4: String,
  noun5: String,
  noun6: String,
  noun7: String,
  noun8: String,
  noun9: String,
  pluralNoun1: String,
  pluralNoun2: String,
  pluralNoun3: String,
  bodyPart1: String,
  bodyPart2: String,
  bodyPart3: String,
  adjective1: String,
  adjective2: String,
  adjective3: String,
  adjective4: String,
  adjective5: String,
  adjective6: String,
  verb1: String,
  verb2: String,
  verbing: String, 
  adverb1: String,
  clothing: String,
  exclaim: String,
  name: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String
});

// Map it through Mongoose
var Form1 = mongoose.model('Form1', form1Schema);


module.exports = Form1;