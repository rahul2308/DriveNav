
var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;

var warangal = new google.maps.LatLng(17.968901, 79.594054);

function initialize() {

  var mapOptions = {
    zoom: 7,
    center: warangal
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  calcRoute();
}

function calcRoute() {

  var request = {
    origin: 'NIT Warangal, Warangal',
    destination: 'Warangal, Telangana',
    waypoints:[{location: 'Spencers, Warangal'}, {location: 'Municipal Corportation, Warangal'}],
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.0;
  document.getElementById('total').innerHTML = total + ' km';
}

google.maps.event.addDomListener(window, 'load', initialize);