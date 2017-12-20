var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?h=350&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor amet ethical taxidermy succulents snackwave, truffaut beard blue bottle knausgaard before they sold out salvia. Kickstarter glossier kombucha, kale chips shaman woke bicycle rights marfa dreamcatcher portland lumbersexual sartorial. Deep v post-ironic etsy crucifix forage franzen. Four dollar toast iPhone chicharrones you probably haven't heard of them tilde crucifix. Snackwave tumblr raclette wayfarers poke paleo copper mug whatever ramps. Meggings viral four loko forage street art messenger bag butcher keffiyeh iceland chambray chartreuse typewriter swag whatever enamel pin. Blog trust fund salvia raclette farm-to-table four loko drinking vinegar."
    },
    {
        name: "Forest Greens",
        image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?h=350&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor amet ethical taxidermy succulents snackwave, truffaut beard blue bottle knausgaard before they sold out salvia. Kickstarter glossier kombucha, kale chips shaman woke bicycle rights marfa dreamcatcher portland lumbersexual sartorial. Deep v post-ironic etsy crucifix forage franzen. Four dollar toast iPhone chicharrones you probably haven't heard of them tilde crucifix. Snackwave tumblr raclette wayfarers poke paleo copper mug whatever ramps. Meggings viral four loko forage street art messenger bag butcher keffiyeh iceland chambray chartreuse typewriter swag whatever enamel pin. Blog trust fund salvia raclette farm-to-table four loko drinking vinegar."
    },
    {
        name: "Magic Surf",
        image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?h=350&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor amet ethical taxidermy succulents snackwave, truffaut beard blue bottle knausgaard before they sold out salvia. Kickstarter glossier kombucha, kale chips shaman woke bicycle rights marfa dreamcatcher portland lumbersexual sartorial. Deep v post-ironic etsy crucifix forage franzen. Four dollar toast iPhone chicharrones you probably haven't heard of them tilde crucifix. Snackwave tumblr raclette wayfarers poke paleo copper mug whatever ramps. Meggings viral four loko forage street art messenger bag butcher keffiyeh iceland chambray chartreuse typewriter swag whatever enamel pin. Blog trust fund salvia raclette farm-to-table four loko drinking vinegar."
    }
];

function seedDB() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
         console.log("Removed campgrounds");   
        }
    // Add a few campgrounds
    data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    // Create a comment
                    Comment.create({
                        
                        text: "This place is great!",
                        author: "Homer"
                        
                    }, function(err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;