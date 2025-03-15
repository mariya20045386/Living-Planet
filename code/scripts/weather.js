/*********************************************
******************************************
* Title: weather.js
* Author: Mariya Razzak
* Date: 03/06/2024
* Code version: 1.0
* Availability: /scripts/weather.js
*
**********************************************
*****************************************/

// Get weather for Living Planet on page load
$(document).ready(function () {
    getCurrentWeather("54.9766947385636", "-1.6075096324716596");
    $("#weatherlocation").text("Living Planet, Newcastle upon Tyne");
});

// Get current weather data for selected location from OpenWeatherMap API, passing in the latitude and longitude
function getCurrentWeather(lat, lng) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&units=metric&appid=979c8acf5f61e755c451eea4151c1e4a', displayCurrentWeather);
}

// Populate the current weather data on the page
function displayCurrentWeather(data) {
    $("#weatherdescription").text(data.weather[0].description);
    $("#weathertemp").text(data.main.temp);
    $("#weatherwind").text(data.wind.speed);
    $("#weatherclouds").text(data.clouds.all);
    $("#weatherhumidity").text(data.main.humidity);
}

// Get selected location name from OpenWeatherMap API, passing in the latitude and longitude
function getWeatherLocation(lat, lng) {
    $.getJSON('http://api.openweathermap.org/geo/1.0/reverse?lat=' + lat + '&lon=' + lng + '&limit=1&appid=979c8acf5f61e755c451eea4151c1e4a', displayWeatherLocation);
}

// Populate  the location name on the page
function displayWeatherLocation(data) {
    $("#weatherlocation").text(data[0].name);
}