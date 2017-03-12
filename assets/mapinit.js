'use strict';

window.initAutocomplete = function() {
  let defaultPosition = {
    lat: 42.364506,
    lng: -71.038887
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: defaultPosition
  });

  // creates the search box and links it to UI
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];

  // Set up a pop up window for markers
  let infowindow = new google.maps.InfoWindow();
  let infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        return;
      }

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        // icon: icon,
        title: place.name,
        position: place.geometry.location,
        placeInfo: place
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
    });

    // Add click handler for all the markers
    markers.forEach((marker) => {
      marker.addListener('click', function() {
        infowindow.open(map, marker);

        marker.setVisible(true);

        infowindowContent.children['place-name'].textContent = marker.title;
        // infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children['place-address'].textContent =
          marker.placeInfo.formatted_address;
        //showing price level and rating
        infowindowContent.children['rating'].textContent = marker.placeInfo.rating?`Rating: ${marker.placeInfo.rating}`:'';
        infowindowContent.children['price-rating'].textContent = marker.placeInfo.price_level?`Price Level: ${marker.placeInfo.price_level}`:'';
      });
    });
  });
};
