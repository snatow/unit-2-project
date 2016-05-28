//=========================
// REQUIREMENTS
//=========================

//Express
var express = require("express");
var app = express();

//Morgan
var morgan = require("morgan");

//Body-Parser
var bodyParser = require("body-parser");

//Method Override
var methodOverride = require("method-override");

//Port
var port = process.env.PORT || 3000;

//Mongo
var db = process.env.MONGODB_URI || "mongodb://localhost/mad_libs_pictures_dev"

//Mongoose
var mongoose = require("mongoose");

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: process.env.FLICKR_API_KEY,
      secret: process.env.FLICKR_SECRET
    };

//=========================
// MIDDLEWARE
//=========================

//Logger
app.use(morgan("dev"));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Public Files
app.use(express.static("public"));

//Method Override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//=========================
// DATABASE
//=========================

//Mongoose
mongoose.connect(db);

//=========================
// CONTROLLERS
//=========================


var madLibsController = require("./controllers/mad_libs.js");
app.use('/mad-libs', madLibsController);



//=========================
// LISTEN
//=========================
app.listen(port);
console.log("server is going strong, port: " + port);