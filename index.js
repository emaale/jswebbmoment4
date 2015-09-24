// Initiate variables
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var response = {};

// Use body parser so we can get post data
app.use(bodyParser.json());

// Returns all todoitems
app.get("/todoitem", function(req, res) {
	// Get the todoitems
	response.todoitems = require("./todoitems.json");

	// Set error to false
	response.error = false;

	res.json(response);
});

// Adds a todoitem
app.post("/todoitem", function(req, res) {
	// Get the todoitems
	response.todoitems = require("./todoitems.json");

	// Make sure the description was sent
	if (req.body.description != null) {
		// Push a new entry to the todoitems array
		response.todoitem = {
			id: response.todoitems.length,
			description: req.body.description,
			isFinished: false,
			created_at: new Date()
		};

		response.todoitems.push(response.todoitem);

		// Write to file
		fs.writeFile("todoitems.json", JSON.stringify(response.todoitems), function(err) {
			if (err) {
				// Handle error
				response.error = true;
				response.errorMessage = "Error: couldn't add todoitem";			
			} else {
				// Set error to false
				response.error = false;
			}

			res.json(response);
		});
		
	} else {
		// Handle error
		response.error = true;
		response.errorMessage = "Error: no description specified.";

		res.json(response);
	}
});

// Updates the isFinished field on the todoitem
app.put("/todoitem/:id", function(req, res) {
	// Get the todoitems
	response.todoitems = require("./todoitems.json");

	// Change the isFinished field on the todoitem with the specified id
	response.todoitems[req.params.id].isFinished = !response.todoitems[req.params.id].isFinished;

	// Write to file
	fs.writeFile("todoitems.json", JSON.stringify(response.todoitems), function(err) {
		if (err) {
			// Handle error
			response.error = true;
			response.errorMessage = "Error: couldn't update todoitem";			
		} else {
			// Set error to false
			response.error = false;
		}

		res.json(response);
	});

});

// Serve static files
app.use(express.static('./public'));

// Listen on port
app.listen(8080);
console.log("Listening on port 8080");

