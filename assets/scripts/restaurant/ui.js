'use strict';

const store = require('../store');

const success = function (data){
  console.log(data);
};

const failure = function (error){
  console.log(error);
};

module.exports = {
  success,
  failure
};
