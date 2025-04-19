// script.js
let map;
let service;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
  service = new google.maps.places.PlacesService(map);
}

function searchGyms() {
  const location = document.getElementById('locationInput').value;
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: location }, (results, status) => {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(14);

      const request = {
        location: results[0].geometry.location,
        radius: '5000',
        type: ['gym']
      };

      service.nearbySearch(request, (results, status) => {
        if (status === 'OK') {
          results.forEach(place => {
            new google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name
            });
          });
        }
      });
    }
  });
}
