'use strict';

function initMap() {
  let uluru = {
    lat: 42.364506,
    lng: -71.038887
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });
  let marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

}
