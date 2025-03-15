/*********************************************
******************************************
* Title: airQuality.js
* Author: Mariya Razzak
* Date: 03/06/2024
* Code version: 1.0
* Availability: /scripts/airQuality.js
*
**********************************************
*****************************************/

// Get air quality data from OpenWeatherMap API, passing in the latitude and longitude of the location
function fetchAirQuality(lat, lon) {
    $.getJSON('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=979c8acf5f61e755c451eea4151c1e4a', displayAirQuality);
}

// Populate the air quality data on the page
function displayAirQuality(data) { 
    var aqi = data.list[0].main.aqi;
    var aqiDescription = getAqiDescription(aqi);

    $("#airQuality").text(aqi + ' (' + aqiDescription + ')');
    $("#co").text(data.list[0].components.co);
    $("#no").text(data.list[0].components.no);
    $("#no2").text(data.list[0].components.no2);
    $("#o3").text(data.list[0].components.o3);
    $("#so2").text(data.list[0].components.so2);
    $("#pm25").text(data.list[0].components.pm2_5);
    $("#pm10").text(data.list[0].components.pm10);
    $("#nh3").text(data.list[0].components.nh3);
}

function getAqiDescription(aqi) {
    switch (aqi) {
        case 1:
            return 'Good';
        case 2:
            return 'Fair';
        case 3:
            return 'Moderate';
        case 4:
            return 'Poor';
        case 5:
            return 'Very Poor';
        default:
            return 'Unknown';
    }
}

