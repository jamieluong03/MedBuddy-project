// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
require('dotenv').config();

var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3001;

var db = require("./models");


// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/medLog-api.js")(app);
require("./routes/medRoutine-api.js")(app);
require("./routes/user-api.js")(app);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  const path = require('path');
  app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });;

};


// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
