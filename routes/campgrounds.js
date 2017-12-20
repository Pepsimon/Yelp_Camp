var express         =   require("express"),
    router          =   express.Router(),
    Campground      =   require("../models/campground"),
    middleware      =   require("../middleware");

router.get("/", function(req, res) {
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
       if(err) {
            console.log("Something went wrong getting data from database!");
       } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

router.post("/",middleware.isLoggedIn, function(req, res) {
   // Get data from form, and add to campgrounds array.
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
   var newCampground = {name: name, image: image, description: desc, author: author, price: price};
   // Create a campground and save to DB.
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err) {
           console.log("Could not create new campground");
       } else {
           // Redirect to campgrounds page.
           res.redirect("/campgrounds");
       }
   });
});


router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW CAMPGROUND ROUTE ==========================

router.get("/:id", function(req, res) {
    // find the campground by provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if(err) {
            res.send(err);
        } else {
            console.log(foundCamp);
            // Render show template with selected campground
            res.render("campgrounds/show", {campground: foundCamp});        
        }
    });
});


// EDIT CAMPGROUND ROUTE ==============

router.get("/:id/edit", middleware.checkUserOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            req.flash("error", "Could not find campground");
        }
        res.render("campgrounds/edit", {campground: foundCampground});   
    });
});


// UPDATE CAMPGROUND ROUTE ============

router.put("/:id", middleware.checkUserOwnership, function(req, res) {
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // Redirect
});


// DESTROY CAMPGROUND ROUTE ============

router.delete("/:id", middleware.checkUserOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;