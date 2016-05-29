// REQUIREMENTS
var express = require('express');
var router = express.Router();
var Form = require('../models/form1.js');
var request = require('request');
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
  Form.find().then(function(form) {
    res.render("index.ejs", {data: form})
  })
});

//New Page Pirate Mad Lib
router.get("/newpirate", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("./newPages/pirate.ejs");
});

//New Page Date Mad Lib
router.get("/newdate", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("./newPages/date.ejs");
});

//New Page Study Mad Lib
router.get("/newstudy", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("./newPages/study.ejs");
});

//New Page Dentist Mad Lib
router.get("/newdentist", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("./newPages/dentist.ejs");
});

// Show Page Pirate Mad Lib
router.get('/pirate/:id', function(req, res) {
  console.log(req.params.id);
  Form.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("./showPages/pirate.ejs", form);
  });
});

// Show Page Date Mad Lib
router.get('/date/:id', function(req, res) {
  console.log(req.params.id);
  Form.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("./showPages/date.ejs", form);
  });
});

// Show Page Study Mad Lib
router.get('/study/:id', function(req, res) {
  console.log(req.params.id);
  Form.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("./showPages/study.ejs", form);
  });
});

// Show Page Dentist Mad Lib
router.get('/dentist/:id', function(req, res) {
  // console.log("hello");
  // console.log(req.params.id);
  Form.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("./showPages/dentist.ejs", form);
  });
});

//Edit Page Pirate Mad Lib
router.get("/pirate/:id/edit", function(req, res) {
  Form.findById(req.params.id).then(function(form) {
    res.render("./editPages/pirate.ejs", form);
  });
});

//Edit Page Date Mad Lib
router.get("/date/:id/edit", function(req, res) {
  Form.findById(req.params.id).then(function(form) {
    res.render("./editPages/date.ejs", form);
  });
});

//Edit Page Study Mad Lib
router.get("/study/:id/edit", function(req, res) {
  Form.findById(req.params.id).then(function(form) {
    res.render("./editPages/study.ejs", form);
  });
});

//Edit Page Dentist Mad Lib
router.get("/dentist/:id/edit", function(req, res) {
  Form.findById(req.params.id).then(function(form) {
    res.render("./editPages/dentist.ejs", form);
  });
});

//Update Page 
router.put("/:id", function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id); 
  Form.findOneAndUpdate( { _id: req.params.id }, req.body, function(err, form) {
    res.redirect("/mad-libs/" + form.title + "/" + req.params.id);
  })
})

// Create
router.post('/', function(req, res) {
  var word = req.body.title;
  flickr.tokenOnly(flickrOptions, function(error, flickr) {
    flickr.test.echo({"test": "test"}, function(err,result) {
      if(err) { return console.log("note: error connecting to the flickr API"); }
      var noun1Result;
      flickr.photos.search({ 
        tags: word,
        per_page: 4,
        page: 1 }, function(err,result) {
        if(err) { return console.log("error:", err); }
        console.log(result.photos.photo.length + " results found. First result:");
        // console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
        var firstResult = result.photos.photo[0];
        var img1 = "https://farm" + firstResult.farm + ".staticflickr.com/" + firstResult.server + "/" + firstResult.id + "_" + firstResult.secret + ".jpg"
        req.body.image1 = img1;
        var secondResult = result.photos.photo[1];
        var img2 = "https://farm" + secondResult.farm + ".staticflickr.com/" + secondResult.server + "/" + secondResult.id + "_" + secondResult.secret + ".jpg"
        req.body.image2 = img2;
        var thirdResult = result.photos.photo[2];
        var img3 = "https://farm" + thirdResult.farm + ".staticflickr.com/" + thirdResult.server + "/" + thirdResult.id + "_" + thirdResult.secret + ".jpg"
        req.body.image3 = img3;
        var fourthResult = result.photos.photo[3];
        var img4 = "https://farm" + fourthResult.farm + ".staticflickr.com/" + fourthResult.server + "/" + fourthResult.id + "_" + fourthResult.secret + ".jpg"
        req.body.image4 = img4;
        // console.log(req.body);
        var newform = new Form(req.body);
        newform.save(function(err) {
          if(err) {
            console.log(err);
          } else {
            // res.send(product);
            res.redirect("/mad-libs");
          }
        });
      });
    });
  });
});

// // Create
// router.post('/', function(req, res) {
//   // console.log(req.body);
//   // res.send("post request");
//   var newform = new Form(req.body);
//   newform.save(function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       res.redirect("/mad-libs");
//     }
//   });
// });

// Delete
router.delete('/:id', function(req, res) {
  Form.findOneAndRemove({_id: req.params.id}, function(err) {
    if(err) console.log(err);
    console.log("Mad Lib deleted");
    res.redirect("/mad-libs");  
  });
});

module.exports = router;