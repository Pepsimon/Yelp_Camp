var methodOverride  =   require("method-override"),
    LocalStrategy   =   require("passport-local"),
    bodyParser      =   require("body-parser"),
    Campground      =   require("./models/campground"),
    mongoose        =   require("mongoose"),
    passport        =   require("passport"),
    Comment         =   require("./models/comment"),
    express         =   require("express"),
    seedDB          =   require("./seeds"),
    flash           =   require("connect-flash"),
    User            =   require("./models/user"),
    app             =   express();
    
var campgroundRoutes    =   require("./routes/campgrounds"),
    commentRoutes       =   require("./routes/comments"),
    indexRoutes         =   require("./routes/index");
    
// var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v5"
var url = process.env.DATABASEURL || "mongodb://Pepsimon:$imon$en1985@ds161146.mlab.com:61146/yelpcamper";
// mongodb://Pepsimon:$imon$en1985@ds161146.mlab.com:61146/yelpcamper
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

// PASSPORT CONFIGURATION ======================================================

app.use(require("express-session")({
    secret: "Atom bomba bass station",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//==============================================================================

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});

