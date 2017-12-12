'use strict';

const barJS = require('./bar');

function asyncFoo() {
  return Promise.resolve()
    .then(() => barJS.callBar());
}

module.exports.asyncFoo = asyncFoo;
