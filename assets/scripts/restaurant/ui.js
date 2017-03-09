'use strict';

const restaurantList = require ('../templates/restaurantlist.handlebars');
const store = require('../store');

const displayRestforUser = (data) => {
  const events = require('../restaurant/events.js');
  $('.restaurant-list').empty(); // empty in case it had already been requested
  let html = restaurantList({restaurants: data.restaurants});
  $('.restaurant-list').append(html); // add the list of restaurants that the user has

  // $('.restaurant-check-icon').click(function() {
  //   let id = this.getAttribute('data-id');
  //   events.updateRest(id);
  // });

  $('.restaurant-trash-icon').click(function() {
    let id = this.getAttribute('data-id');
    console.log(events);
    events.deleteRest(id);
  });

};

const success = function (data){
  console.log(data);
};

const failure = function (error){
  console.log(error);
};

module.exports = {
  success,
  failure,
  displayRestforUser
};
