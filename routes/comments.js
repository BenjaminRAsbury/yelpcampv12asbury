var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        };
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            req.flash("error", "Something went wrong.")
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    //Add Username and ID
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //Save Comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Success.  Comment added.")
                    res.redirect("/campgrounds/" + campground._id);
                };
            });
        };
    });
});

//Edit
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (!foundComment) {
                        req.flash("error", "Item not found.");
                        res.redirect("back");
                    };
                res.render("comments/edit", {campground: foundCampground, campground_id: req.params.id, comment: foundComment});
            };
        });
    });
});

//Update
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findOneAndUpdate({"_id": req.params.comment_id}, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
});

//Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findOneAndDelete({"_id": req.params.comment_id}, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            res.flash("success", "Comment deleted.")
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
});

module.exports = router;
