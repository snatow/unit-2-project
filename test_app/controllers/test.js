// REQUIREMENTS
var express = require('express');
var router = express.Router();
var Test = require('../models/test.js');
var request = require('request');
// var Flickr = require("flickrapi"),
//     flickrData = flickr.loadLocally();
var flickr = require("flickrapi");
var flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SECRET
};

// // Test route
// router.get('/', function(req, res) {
//    // var b = "anything";
//    // res.send (b);
//   // console.log("hello");
//   // flickr.tokenOnly(flickrOptions, function(error, flickr) {
//   //   flickr.photos.search({
//   //     tags: "blue",
//   //     page: 1,
//   //     per_page: 1
//   //     }, function(err, result) {
//   //     console.log(typeof result);
//   //     console.log(result);
//   //   });
//   // })
//   flickr.tokenOnly(flickrOptions, function(error, flickr) {
//     console.log("made it here");
//    flickr.test.echo({"test": "test"}, function(err,result) {
//     console.log("made it into flickr.test.echo");
//      if(err) { return console.log("note: error connecting to the flickr API"); }
//       var firstResult;
//        flickr.photos.search({ 
//         tags: "red+panda",
//         per_page: 1,
//         page: 1 }, function(err,result) {
//         // console.log("this is the result: ");
//         // console.log(result);
//         // console.log("made it to search");
//          if(err) { return console.log("error:", err); }
//          console.log(result.photos.photo.length + " results found. First result:");
//          console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
//           firstResult = JSON.stringify(result.photos.photo[0],false,2);
//           console.log("my version" + firstResult);
//           console.log(typeof firstResult);
//           console.log(result.photos.photo[0]);
//           console.log(typeof result.photos.photo[0]);
//           res.send(firstResult);
//           // res.json(result.photos.photo[0]);
//           // res.json(firstResult);
//           // return firstResult;
//          //process.exit(0);
//          // res.send(JSON.stringify(result.photos.photo.length));
//      });
//           // console.log("anything");
//           // console.log("first result: " + firstResult);
//    });
//  });
//   console.log("anything");
// });



// Index
router.get('/', function(req, res) {
  // Test Route
  // console.log('hello');
  // res.send('goodbye')
  Test.find().then(function(form) {
    res.render("index.ejs", {data: form})
  })
});

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

// Create
router.post('/', function(req, res) {
  // console.log(req.body);
  // console.log(req.body.word);
  var response;
  var word = req.body.word;
  flickr.tokenOnly(flickrOptions, function(error, flickr) {
    flickr.test.echo({"test": "test"}, function(err,result) {
      if(err) { return console.log("note: error connecting to the flickr API"); }
      var firstResult;
      flickr.photos.search({ 
        tags: word,
        per_page: 1,
        page: 1 }, function(err,result) {
        if(err) { return console.log("error:", err); }
        // console.log(result.photos.photo.length + " results found. First result:");
        // console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
        firstResult = result.photos.photo[0];
        var img = "https://farm" + firstResult.farm + ".staticflickr.com/" + firstResult.server + "/" + firstResult.id + "_" + firstResult.secret + ".jpg"
        req.body.image = img;
        // console.log(req.body);
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
    });
  });
});

module.exports = router;