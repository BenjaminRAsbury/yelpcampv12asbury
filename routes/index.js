var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Root Route
router.get("/", (req, res) => {
   res.render("landing");
});

//Shwo Register Form
router.get("/register", (req, res) => {
    res.render("register");
});

//Signup Logic Route
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp, " + user.username)
            res.redirect("/campgrounds");
        });
    });
});

//Login Form
router.get("/login", (req, res) => {
    res.render("login");
});

//Login Logic
//app.post("/login", MIDDLEWARE, (req, res) => {DO STUFF};
//THE CALLBACK AFTER MIDDLEWARE CAN BE REMOVED AS IT DOES NOTHING
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
}), (req, res) => {
});

//Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged You OUT!");
    res.redirect("/campgrounds");
});

module.exports = router;