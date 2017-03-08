'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');


const onCreateRest = (event) =>{
  event.preventDefault();
  let data = getFormFields(event.target);

  api.createRestaurant(data)
    .then((response) => {
      console.log('create response is', response);
      // store.restaurant = response.restaurant; // restaurant is created is now saved
    })
    .then(ui.success)
    .catch(ui.failure);
};


const addHandlers = () => {
  $('#create-restaurant').on('submit', onCreateRest);
};

module.exports = {
  addHandlers,
};
