var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//Index - Show all Campgrounds
router.get("/", (req, res) => {
    //get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log("Something went Wrong: Campground.find");
            console.log(err);
        } else {
            console.log("All good: Campground.find");
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        };
    });
});

//Create - Add new Campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    //create new campground and save to db
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log("Error: Campground.create");
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        };
    });
});

//New - Display form to create new Campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//Show - Shows more info about one camp
router.get("/:id", (req, res) => {
    //find camp w/provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "Sorry, that campground does not exist!");
            return res.redirect("/campgrounds");
        } else {
            console.log(foundCampground);
            console.log("Success: Campground.findById");
            //render SHOW template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        };
    });
});

//Edit
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
   Campground.findOneAndUpdate({"_id": req.params.id}, req.body.campground, (err, updatedCampground) => {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       };
   });
});

//Destroy
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findOneAndDelete({"_id": req.params.id}, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Success.  It was the only way to be sure.")
            res.redirect("/campgrounds");
        };
    });
});

module.exports = router;