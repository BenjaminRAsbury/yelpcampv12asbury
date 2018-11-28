var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "StarStreak Meadow",
        image: "https://images.unsplash.com/photo-1531097517181-3de20fd3f05c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=21e8b8882ebe52dd2cea9022b73b9861&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        name: "CreepyCamp Curve",
        image: "https://images.unsplash.com/photo-1529458088454-727e5b68947a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d79691106ee6c1d8d3063b14e195f5e&auto=format&fit=crop&w=1000&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        name: "Lesson Learned Lantern School",
        image: "https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a13e64c2ca5f8236aebd26c4226acf2&auto=format&fit=crop&w=634&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
];
    
function seedDB() {
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("removed Campgrounds");
            // add campgrounds
            data.forEach((seed) => {
               Campground.create(seed, (err, campground) => {
                   if (err) {
                       console.log(err);
                   } else {
                       console.log("Added a campground");
                       // Create a comment
                       Comment.create(
                           {
                                text: "It is a Campground.",
                                author: "Dwight",
                            }, (err, comment) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Added a comment!");
                                };
                        });
                   };
               }) ;
            });
        };
    });
    //add comments
    
    
};
module.exports = seedDB;