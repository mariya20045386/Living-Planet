/*********************************************
******************************************
* Title: distance.js
* Author: Mariya Razzak
* Date: 03/06/2024
* Code version: 1.0
* Availability: /scripts/distance.js
*
**********************************************
*****************************************/

let origin1;
let directionsService;
let directionsDisplay;
let currentDestination = null;
let map;

// Method to set up map
function initMap() {
    let myLatlng = new google.maps.LatLng(54.9766947385636, -1.6075096324716596);

    // Set up the origin to Living Planet
    origin1 = {
        name: "Living Planet, Newcastle upon Tyne",
        latLng: myLatlng,
    };

      // Set up the map options
      let mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: true,
          overviewMapControl: false,
          rotateControl: false,
          scaleControl: false,
          panControl: false,
          mapId: "LP_MAP_ID",
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      // Set up markers after map is created
      SetUpMarkers();

      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

      // Add a click listener to the map to calculate the distance and directions and get the weather details
      map.addListener('click', function(event) {
          currentDestination = event.latLng;
          calculateDistanceAndDirections(origin1, currentDestination);
          
          getCurrentWeather(currentDestination.lat(), currentDestination.lng());
          getWeatherLocation(currentDestination.lat(), currentDestination.lng());
      });

      // Add a change listener to the travel mode dropdown, so that the distance and directions can be recalculated on change
      $('#travelMode').change(function() {
          if (currentDestination) {
            calculateDistanceAndDirections(origin1, currentDestination);
          }
      });
    }

function calculateDistanceAndDirections(origin, destination) {
    // Get the selected travel mode
    let travelMode = google.maps.TravelMode[$('#travelMode').val()];

    // Get the distance details between the origin and destination
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin.latLng],
        destinations: [destination],
        travelMode: travelMode,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
      if (status == google.maps.DistanceMatrixStatus.OK) {
          let origins = response.originAddresses;
          let destinations = response.destinationAddresses;

          $.each(origins, function(originIndex) {
            let results = response.rows[originIndex].elements;
            $.each(results, function(resultIndex) {
              let element = results[resultIndex];
              let distance = element.distance.text;
              let duration = element.duration.text;
              let from = origin.name;
              let to = destinations[resultIndex];
              
              // Clear the existing distance info and add the new information
              $("#distance-info").html( "<h2>Distance Information</h2>" 
              + "<dl id='distance-dl'><dt>Distance: </dt><dd>" 
              + distance 
              + "</dd> <dt>Duration: </dt><dd>" 
              + duration 
              + "</dd> <dt>From: </dt><dd>" 
              + from 
              + "</dd> <dt>To: </dt><dd>" 
              + to 
              + "</dd></dl>");
            });
          });
      } else {
            window.alert.log("Error with DistanceMatrixService: " + status);
        }
      });

    // Get the directions between the origin and destination
    let request = {
        origin: origin.latLng,
        destination: destination,
        travelMode: travelMode
    };

    // Check if the travel mode is transit and set the departure time to the current time
    if (travelMode === google.maps.TravelMode.TRANSIT) {
        if (!request.transitOptions) {
          request.transitOptions = {};
        }
        request.transitOptions.departureTime = new Date();
    }

    // Get the directions and display the route on the map and the directions in the panel
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          directionsDisplay.setPanel(document.getElementById("directionsPanel"));
      } else {
          if (travelMode === google.maps.TravelMode.TRANSIT && status == google.maps.DirectionsStatus.ZERO_RESULTS) {
            window.alert("Transit directions are not available for the selected destination.");
          } else {
            window.alert("Could not retrieve directions between the two locations. Please try again later.");
          }
      }
    });
}