var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;

var warangal = new google.maps.LatLng(17.9341901, 79.81314054);

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
  getLocation();
  // calcRoute();
}

function calcRoute(current_pos, waypoint_pos, destination_pos) {
  var request = {
    origin: current_pos,
    destination: destination_pos,
    waypoints: waypoint_pos,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function getotherlocation(current_pos)
{
  $.ajax({
      url: "data/dummyData.json",
        dataType: "json",
        success: function(IssueData) {
            var destLatitude, destLongitude;
            var waypointLatitude , waypointLongitude;
            var tempwaypoint_pos;
            var waypoint_pos = new Array();
            var issueList = IssueData.issues;
            var datalength = issueList.length;
            for(var i=0; i<datalength; i++) {
                if(issueList[i].locationtype == "destination") {
                    destLongitude = issueList[i].location.longitude;
                    destLatitude = issueList[i].location.latitude;
                }
                else if(issueList[i].locationtype == "waypoint") {
                    waypointLongitude = issueList[i].location.longitude;
                    waypointLatitude = issueList[i].location.latitude;
                    tempwaypoint_pos = new google.maps.LatLng(waypointLatitude, waypointLongitude);
                    waypoint_pos.push({location: tempwaypoint_pos});
                }
            }
            destination_pos = new google.maps.LatLng(destLatitude, destLongitude);
            calcRoute(current_pos, waypoint_pos, destination_pos);
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        current_pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        getotherlocation(current_pos);
      });
    } else { 
        alert ("Geolocation is not supported by this browser.");
    }
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