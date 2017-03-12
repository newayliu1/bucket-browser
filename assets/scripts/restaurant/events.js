'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');

const onListRest = (event) =>{
  if (event !== undefined) {
    event.preventDefault();
  }

  api.listRestaurant()
    .then((response) => {
      store.restaurants = response.restaurants;
      return store;
    })
    .then(ui.displayRestforUser)
    .catch(ui.failure);
};

const onCreateRest = (event) =>{
  event.preventDefault();
  let data = getFormFields(event.target);
  api.createRestaurant(data)
    .then((response) => {
      // store.restaurant = response.restaurant; // restaurant is created is now saved
    })
    .then(onListRest)
    .then(ui.success)
    .catch(ui.failure);
};

const achievedRest = (id) => {
  let data = {};
  data.restaurant = {
    "achieved": true
  };
  api.updateRestaurant(data, id)
    .then(onListRest);
};

const deleteRest = (id) => {
  api.deleteRestaurant(id)
    .then(onListRest);
};


const addHandlers = () => {
  $('#create-restaurant').on('submit', onCreateRest);
  $('#restaurant-lister').on('click', onListRest);
  $('.restaurant-trash-icon').on('click', deleteRest);

};

module.exports = {
  addHandlers,
  onCreateRest,
  onListRest,
  achievedRest,
  deleteRest
};
