/*********************************************
******************************************
* Title: locations.js
* Author: Mariya Razzak
* Date: 03/06/2024
* Code version: 1.0
* Availability: /scripts/locations.js
*
**********************************************
*****************************************/


// Set up markers for locations on the map
function SetUpMarkers() {

    // Create a marker with infoWindow for a location on the map
    function createMarker(latlng, title, infoContent) {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: latlng,
            title: title,
        });

        // Create a section element to hold the content of the infoWindow
        const infoWindowContent = `
        <section id="airQualityWindow" class="infowindow">
            ${infoContent}

                <h2>Air Quality</h2>
                <p>Air Quality Index: <span id="airQuality"></span></p>
                <p>Carbon Monoxide: <span id="co"></span></p>
                <p>Nitrogen Dioxide: <span id="no2"></span></p>
                <p>Ozone: <span id="o3"></span></p>
                <p>Sulphur Dioxide: <span id="so2"></span></p>
                <p>Particulate Matter: <span id="pm10"></span></p>
                <p>Particulate Matter 2.5: <span id="pm25"></span></p>
                <p>Ammonia: <span id="nh3"></span></p>
        </section>`;

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });

        // Add an event listener to open the infoWindow when the mouse enters a location marker
        marker.content.addEventListener('mouseenter', function(){
            // Set air quality data before opening window
            fetchAirQuality(latlng.lat(), latlng.lng());

            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
            fetchWeather(latlng.lat(), latlng.lng());
        });
        
        // Add an event listener to close the infoWindow when the mouse leaves a location marker
        marker.content.addEventListener('mouseleave', function(){
            infoWindow.close();
        });

        return marker;
    }

    // Create markers for locations on the map
    createMarker(new google.maps.LatLng(54.9766947385636, -1.6075096324716596), "Living Planet HQ", '<div id="content"><h1>Living Planet HQ</h1></div>');
    createMarker(new google.maps.LatLng(54.775345, -1.584992), "Durham", '<div id="content"><h1>Durham</h1></div>');
    createMarker(new google.maps.LatLng(54.977442373883314, -1.6321384943985793), "Newcastle upon Tyne", '<div id="content"><h1>Newcastle upon Tyne</h1></div>');
    createMarker(new google.maps.LatLng(51.50083193339024, -0.14835178269798813), "London", '<div id="content"><h1>London</h1></div>');
    createMarker(new google.maps.LatLng(53.4793560792049, -2.2467553869018766), "Manchester", '<div id="content"><h1>Manchester</h1></div>');
    createMarker(new google.maps.LatLng(53.40968316990305, -3.001069609491316), "Liverpool", '<div id="content"><h1>Liverpool</h1></div>');
    createMarker(new google.maps.LatLng(53.79777917578265, -1.5371203313954762), "Leeds", '<div id="content"><h1>Leeds</h1></div>');
    createMarker(new google.maps.LatLng(55.954405881721044, -3.215255692090539), "Edinburgh", '<div id="content"><h1>Edinburgh</h1><</div>');
    createMarker(new google.maps.LatLng(52.480635807709305, -1.9045188803684951), "Birmingham", '<div id="content"><h1>Birmingham</h1></div>');
    createMarker(new google.maps.LatLng(51.457250774778615, -2.5934796020982964), "Bristol", '<div id="content"><h1>Bristol</h1></div>');
    createMarker(new google.maps.LatLng(51.48416982327936, -3.1631801344213537), "Cardiff", '<div id="content"><h1>Cardiff</h1></div>');
    createMarker(new google.maps.LatLng(55.858669932687775, -4.258855656145333), "Glasgow", '<div id="content"><h1>Glasgow</h1></div>');
    createMarker(new google.maps.LatLng(52.19502549710055, 0.13199960044447653), "Cambridge", '<div id="content"><h1>Cambridge</h1></div>');
}

// Get weather data from OpenWeatherMap API, passing in the latitude and longitude of the location
function fetchWeather(lat, lon) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=979c8acf5f61e755c451eea4151c1e4a', displayCurrentWeather);
}


