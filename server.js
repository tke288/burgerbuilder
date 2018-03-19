// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var db = require('./models');

// Set up express
var app = express();
var PORT = process.env.PORT || 3000;

// Serve static content from the "public" directory
app.use(express.static(process.cwd() + "/public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./controllers/burgers_controller.js")(app);

// Sync and listen
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on PORT " + PORT);
    });
});
