// REQUIREMENTS
var express = require('express');
var router = express.Router();
var Form1 = require('../models/form1.js');
var request = require('request');
// var Flickr = require("flickrapi"),
//     flickrData = flickr.loadLocally();
var flickr = require("flickrapi");
var flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SECRET
};

// INDEX
// this route will initially display a link to fill out a new form to populate the mad lib, but later the lower part of the page will display previously created mad libs
router.get('/', function(req, res) {
  // this pair of console log and res.send will test that the route works.
  // console.log('hello');
  // res.send('goodbye')
  Form1.find().then(function(form) {
    res.render("index.ejs", {data: form})
  })
});

//New Page
router.get("/new", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("new.ejs");
});

// Show Page
router.get('/:id', function(req, res) {
  console.log(req.params.id);
  Form1.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("show.ejs", form);
  });
});

//Edit Page
router.get("/:id/edit", function(req, res) {
  Form1.findById(req.params.id).then(function(form) {
    res.render("edit.ejs", form);
  });
});

//Update Page 
router.put("/:id", function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id); 
  Form1.findOneAndUpdate( { _id: req.params.id }, req.body, function(err, form) {
    res.redirect("/mad-libs/" + req.params.id);
  })
})

// // Create
// router.post('/', function(req, res) {
//   var noun1 = req.body.noun1;
//   flickr.tokenOnly(flickrOptions, function(error, flickr) {
//     flickr.test.echo({"test": "test"}, function(err,result) {
//       if(err) { return console.log("note: error connecting to the flickr API"); }
//       var noun1Result;
//       flickr.photos.search({ 
//         tags: noun1,
//         per_page: 1,
//         page: 1 }, function(err,result) {
//         if(err) { return console.log("error:", err); }
//         noun1Result = result.photos.photo[0];
//         var img1 = "https://farm" + noun1Result.farm + ".staticflickr.com/" + noun1Result.server + "/" + noun1Result.id + "_" + noun1Result.secret + ".jpg"
//         req.body.image_noun1 = img1;
//         // console.log(req.body);
//         var newform = new Test(req.body);
//         newform.save(function(err) {
//           if(err) {
//             console.log(err);
//           } else {
//             // res.send(product);
//             res.redirect("/mad-libs");
//           }
//         });
//       });
//     });
//   });
// });

// Create
router.post('/', function(req, res) {
  // console.log(req.body);
  // res.send("post request");
  var newform = new Form1(req.body);
  newform.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/mad-libs");
    }
  });
});

// Delete
router.delete('/:id', function(req, res) {
  Form1.findOneAndRemove({_id: req.params.id}, function(err) {
    if(err) console.log(err);
    console.log("Mad Lib deleted");
    // res.send("Product deleted");
    res.redirect("/mad-libs");  
  });
});

module.exports = router;