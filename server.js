// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Define what port to use
const port = 8000;

// Callback function for the server listener
function listening() {
    console.log('Weather Jounal App Server running');
    console.log(`Running on localhost: ${port}`);
}

// Initiate a server.  Takes the port and a callback function
const server = app.listen(port, listening);

// GET route
app.get('/weather', function (request, response) {
    response.send(projectData);
});

// POST route
app.post('/weather', function (request, response) {

    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.userResponse = request.body.userResponse;

    response.send(projectData);
});