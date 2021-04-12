// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/** Dependencies */
// To parse the data
const bodyParser = require('body-parser');

/** Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// Connect to the express app instance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log('the server for Dr yasser  running');
    console.log(`running on: http://localhost:${port}`);
});

// Create a GET route
app.get('/get', (req, res) => {
    // returns the object named projectData
    res.send(projectData);
    console.log(projectData);
});

app.get('/all', (req, res) => {
    // returns the object named projectData
    res.send(projectData);
    console.log(projectData);
});


// Create a POST route
app.post('/add', (req, res) => {
    newEntry = {
        location: req.body.location,
        dt: req.body.dt,
        temp: req.body.temp,
        icon: req.body.icon,
        description: req.body.description,
        feelsLike: req.body.feelsLike,
        max: req.body.max,
        min: req.body.min,
        feelings: req.body.feelings
    }

    /** projectData is an object so cannot be used .push()
     * Reference: https://knowledge.udacity.com/questions/202925
     */
    projectData = newEntry
    console.log(projectData)
    res.send(projectData)
});
