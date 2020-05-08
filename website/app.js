/* Global Variables */

// api url format: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
// example api.openweathermap.org/data/2.5/weather?zip=94040,us
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '482619460b0b5529ab4cde59127b0ac2'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Add listener to the generate button
document.getElementById('generate').addEventListener('click', displayWeather);



// Function for the listener
function displayWeather(event){
    const zipCode =  document.getElementById('zip').value;
    const feeling =  document.getElementById('feelings').value;
  
    getWeather('/weather') // Async get function written elswhere
    // New Syntax!
    .then(function(data){ // Promise chain
      // Add data
      console.log(data);
      // Async post function written elswhere
      postData('/weather', {temperature:data.temperature, date: data.date, userResponse:feeling} );
    })
    .then( // Another promise chain
      updateUI() //Updat the UI with the data recieved using the function below
    )
  }


// Weather API response example
// {
//     "coord": {"lon": -122.08,"lat": 37.39},
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 282.55,
//       "feels_like": 281.86,
//       "temp_min": 280.37,
//       "temp_max": 284.26,
//       "pressure": 1023,
//       "humidity": 100
//     },
//     "visibility": 16093,
//     "wind": {
//       "speed": 1.5,
//       "deg": 350
//     },
//     "clouds": {
//       "all": 1
//     },
//     "dt": 1560350645,
//     "sys": {
//       "type": 1,
//       "id": 5122,
//       "message": 0.0139,
//       "country": "US",
//       "sunrise": 1560343627,
//       "sunset": 1560396563
//     },
//     "timezone": -25200,
//     "id": 420006353,
//     "name": "Mountain View",
//     "cod": 200
//   }