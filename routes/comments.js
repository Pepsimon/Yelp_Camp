var express         =   require("express"),
    router          =   express.Router({mergeParams: true}),
    Campground      =   require("../models/campground"),
    Comment         =   require("../models/comment"),
    middleware      =   require("../middleware");

// COMMENTS ROUTES =============================================================

router.get("/new",middleware.isLoggedIn, function(req, res) {
    // Find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            res.redirect("campgrounds/index");
        } else {
            res.render("comments/new", {campground: campground});     
        }
    });
});

router.post("/",middleware.isLoggedIn, function(req, res) {
    // Lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        // Create new comments
           Comment.create(req.body.comment, function(err, comment) {
               if(err){
                   req.flash("error", "Something went wrong!");
                   console.log(err);
               } else {
                   // Add username and Id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // Save the comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Successfully added comment");
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
});

// COMMENT EDIT ROUTE =============================

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
            console.log(req.params.comment_id);
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});     
        }
    });
});

// COMMENT UPDATE ROUTE =============================

router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE ==================================

router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;