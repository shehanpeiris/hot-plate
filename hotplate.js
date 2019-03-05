// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defining variables to capture user input
// ========================================================
// Create a reservation array of objects. Each object will be individual
// user data

var tables = [];
var waitlist = [];

//
// Routes
// =============================================================

// GET Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays the reservations (up to 5)
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays the waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});


// POST ROUTES
// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;
  console.log(newTable);
  
  if (tables.length < 5) {
    tables.push(newTable)
  } else {
    waitlist.push(newTable);
  };

  res.json(newTable);
});


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });