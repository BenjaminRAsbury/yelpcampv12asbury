var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash("error", "Campground not found.")
                res.redirect("back");
            } else {
                if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    res.redirect("back");
                };
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Error: You lack the necessary permission.")
                    res.redirect("back");
                };
            };
        });
    } else {
        req.flash("error", "You must login to do that.")
        res.redirect("back");
    };
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash("error", "Oops.  Comment not found.")
                res.redirect("back");
            } else {
                if (!foundComment) {
                    req.flash("error", "Item not found.");
                    res.redirect("back");
                };
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Error: You lack the necessary permission.")
                    res.redirect("back");
                };
            };
        });
    } else {
        res.redirect("back");
    };
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must login to do that.")
    res.redirect("/login");
};

module.exports = middlewareObj;