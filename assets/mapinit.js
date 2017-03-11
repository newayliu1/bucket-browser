'use strict';

window.initAutocomplete = function() {
  let defaultPosition = {
    lat: 42.3600825,
    lng: -71.0588801
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: defaultPosition
  });
  // let marker = new google.maps.Marker({
  //   position: defaultPosition,
  //   map: map
  // });

  let input = document.getElementById('pac-input');

  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  let infowindow = new google.maps.InfoWindow();
  let infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  let marker = new google.maps.Marker({
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    let place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);

    infowindowContent.children['place-name'].textContent = place.name;
    // infowindowContent.children['place-id'].textContent = place.place_id;
    infowindowContent.children['place-address'].textContent =
      place.formatted_address;
    infowindow.open(map, marker);

// click handler stuff
    let ClickEventHandler = function(map, origin) {
      this.origin = origin;
      this.map = map;
      this.directionsDisplay.setMap(map);
      this.placesService = new google.maps.places.PlacesService(map);
      this.infowindow = new google.maps.InfoWindow;
      this.infowindowContent = document.getElementById('infowindow-content');
      this.infowindow.setContent(this.infowindowContent);

      // Listen for clicks on the map.
      this.map.addListener('click', this.handleClick.bind(this));
    };

    ClickEventHandler.prototype.handleClick = function(event) {
      console.log('You clicked on: ' + event.latLng);
      // If the event has a placeId, use it.
      if (event.placeId) {
        console.log('You clicked on place:' + event.placeId);

        // Calling e.stop() on the event prevents the default info window from
        // showing.
        // If you call stop here when there is no placeId you will prevent some
        // other map click event handlers from receiving the event.
        event.stop();
        this.calculateAndDisplayRoute(event.placeId);
        this.getPlaceInformation(event.placeId);
      }
    };

    ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
      let me = this;
      this.placesService.getDetails({
        placeId: placeId
      }, function(place, status) {
        if (status === 'OK') {
          me.infowindow.close();
          me.infowindow.setPosition(place.geometry.location);
          me.infowindowContent.children['place-icon'].src = place.icon;
          me.infowindowContent.children['place-name'].textContent = place.name;
          me.infowindowContent.children['place-id'].textContent = place.place_id;
          me.infowindowContent.children['place-address'].textContent =
            place.formatted_address;
          me.infowindow.open(me.map);
        }
      });
    };

  });

};
