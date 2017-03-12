'use strict';

const restaurantList = require ('../templates/restaurantlist.handlebars');
const store = require('../store');

const displayRestforUser = (data) => {
  const events = require('../restaurant/events.js');
  $('.restaurant-list').empty(); // empty in case it had already been requested
  let html = restaurantList({restaurants: data.restaurants});
  $('.restaurant-list').append(html); // add the list of restaurants that the user has

  $('.restaurant-check-icon').click(function() {
    let id = this.getAttribute('data-id');
    events.achievedRest(id);
  });

  $('.restaurant-trash-icon').click(function() {
    let id = this.getAttribute('data-id');
    events.deleteRest(id);
  });

};

const success = function (){
  $('.restaurants-input').val('');
  $('.save-restaurant-message').text("");
};

const failure = function (error){
  $('.save-restaurant-message').text("Sorry, please fill in at lease a Name, Location, and Type.");
};

module.exports = {
  success,
  failure,
  displayRestforUser
};
