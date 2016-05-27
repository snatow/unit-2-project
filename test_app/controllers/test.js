// REQUIREMENTS
var express = require('express');
var router = express.Router();
var Test = require('../models/test.js');
var request = require('request');
var flickr = require("flickrapi");
var flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SECRET
};

// Test route
router.get('/', function(req, res) {
   // var b = "anything";
   // res.send (b);
  // console.log("hello");
  // flickr.tokenOnly(flickrOptions, function(error, flickr) {
  //   flickr.photos.search({
  //     tags: "blue",
  //     page: 1,
  //     per_page: 1
  //     }, function(err, result) {
  //     console.log(typeof result);
  //     console.log(result);
  //   });
  // })
  flickr.tokenOnly(flickrOptions, function(error, flickr) {
    console.log("made it here");
   flickr.test.echo({"test": "test"}, function(err,result) {
    console.log("made it into flickr.test.echo");
     if(err) { return console.log("note: error connecting to the flickr API"); }
      var firstResult;
       flickr.photos.search({ 
        tags: "red+panda",
        per_page: 1,
        page: 1 }, function(err,result) {
        // console.log("this is the result: ");
        // console.log(result);
        // console.log("made it to search");
         if(err) { return console.log("error:", err); }
         console.log(result.photos.photo.length + " results found. First result:");
         console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
          firstResult = JSON.stringify(result.photos.photo[0],false,2);
          console.log("my version" + firstResult);
          console.log(typeof firstResult);
          console.log(result.photos.photo[0]);
          console.log(typeof result.photos.photo[0]);
          res.send(firstResult);
     });
   });
 });
  console.log("anything");
});



// // Index
// router.get('/', function(req, res) {
//   // Test Route
//   // console.log('hello');
//   // res.send('goodbye')
//   Test.find().then(function(form) {
//     res.render("index.ejs", {data: form})
//   })
// });

//New Page
router.get("/new", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("new.ejs");
});

// Show
router.get('/:id', function(req, res) {
  console.log(req.params.id);
  Test.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("show.ejs", form);
  });
});

// // Show movie
// router.get('/:id', function(req, res) {
//   var id = req.params.id;
//   Test.findById
//   request('http://www.omdbapi.com/?t=' + encodeURIComponent(movie_title), function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // console.log('API data: ' + body);
//       // res.send(response.body);
//       res.render("show.ejs", JSON.parse(response.body));
//     }
//   });
// });

// Create
router.post('/', function(req, res) {
  console.log(req.body);
  console.log(req.body.word);
  // res.send("post request");
  var response;
  flickr.photos.search({
    tags: req.body.word,
    page: 1,
    per_page: 1
  }, function(err, result) {
    console.log(typeof result);
    console.log(result);
  });
  var newform = new Test(req.body);
  newform.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      // res.send(product);
      res.redirect("/test");
    }
  });
});



module.exports = router;