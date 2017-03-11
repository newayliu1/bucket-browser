'use strict';

const getDataFromMaps = function(event) {
  event.preventDefault();
  let place = {};
  place.name = $('#place-name').text();
  place.address = $('#place-address').text();
  // $('#restaurantName').val('');
  // $('#restaurantAddress').val('');
  $('#restaurantName').val(place.name);
  $('#restaurantAddress').val(place.address);
  console.log($('#place-address'));
};

const addHandlers = function () {
  $('.getDataFromMaps').on('click', getDataFromMaps);
};

module.exports = {
  addHandlers,
};
