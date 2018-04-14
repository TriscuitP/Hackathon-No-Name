// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, service;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initMap() 
{
  var pos = {lat: 37.757, lng: -122.472};

  map = new google.maps.Map(document.getElementById('map'), 
  {
    center: pos,
    zoom: 12
  });
 
  service = new google.maps.places.PlacesService(map);

  // Try HTML5 geolocation.
  if(navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(function(position) 
    {
      pos = {lat: position.coords.latitude, lng: position.coords.longitude};

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, 
    function()
    {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } 
  else 
  {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Search for recycling centers in location.
  var request = 
  {
    location: map.getCenter(),
    radius: '9000',
    query: 'recycle'
  };
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

}

function callback(results, status) {
  console.log("callback triggered");
 if(status == google.maps.places.PlacesServiceStatus.OK) {
   for(var i = 0; i < results.length; i++) {
     createMarker(results[i]);
     console.log(results[i].name);
   }
 }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    label: labels[labelIndex++ % labels.length],
    map: map
  });

  var infowindow = new google.maps.InfoWindow;
  infowindow.setContent(place.name);

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) 
{
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

