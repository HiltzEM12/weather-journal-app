/* Global Variables */

// Global temperature variable
let temperature = 0;

// API url format: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
// example api.openweathermap.org/data/2.5/weather?zip=94040,us
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '482619460b0b5529ab4cde59127b0ac2'

// Document fields
const zipCodeField = document.getElementById('zip');
const feelingField = document.getElementById('feelings');
const dateDisp = document.getElementById('date');
const tempDisp = document.getElementById('temp');
const contentDisp = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


/* Helper Functions */
//Wrapper to create the URL to call the weather API
function createWeatherURL(baseURL, zipCodeField, apiKey) {
    return baseURL + zipCodeField + '&units=imperial&appid=' + apiKey
};

// Add listener to the generate button
document.getElementById('generate').addEventListener('click', onClick);

// Function to handle getting the weather and displaying results
function onClick(event) {
    // Only proceed if there are values in the zip code and feelings fields
    if (zipCodeField && zipCodeField.value && feelingField && feelingField.value) {
        displayWeather(createWeatherURL(baseURL, zipCodeField.value, apiKey));
    }
};

// Function for the listener
function displayWeather(url) {
    // Get the temperature from the weather API using the zip code entered
    callWeatherAPI(url)
        .then(function () {
            // Post the weather and other info to the server
            postData('/weather', {
                temperature: temperature,
                date: newDate,
                userResponse: feelingField.value
            });
        })
        .then(function () {
            updateUI(); // Update the user interface with results and entries
        })
};


// Function for handling the API call to the weather site
// Just returns the temperature and a number
async function callWeatherAPI(url = '') {
    const request = await fetch(url);
    // Throw an error on a 404
    if (request.status === 404) throw new Error('Bad zip code');
    try {
        // Transform to JSON
        const data = await request.json();
        // Get the temperature
        temperature = data.main.temp;
    } catch (error) {
        console.log('error', error);
    }
};

// Function to post data to the server
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match 'Content-Type' header        
    });

    try {
        // Send JSON over to the server
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

// Function to update the user interface
async function updateUI() {
    const request = await fetch('/weather');

    try {
        const newData = await request.json(); // Get the JSON from the server
        // Set the divs
        dateDisp.innerHTML = `On ${newData.date} `
        tempDisp.innerHTML =  `it was ${newData.temperature} degrees F `
        contentDisp.innerHTML = `and you were feeling  ${newData.userResponse}.`
    } catch (error) {
        console.log('error', error);
    }
};