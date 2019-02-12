'use strict';

$(function() {
  document.title = `${CONSTANTS.APP_NAME} | About`;
  $('h1').html(CONSTANTS.APP_NAME);
  $('h2').html(CONSTANTS.SLOGAN);
  $('#defaultSettings').text(JSON.stringify(SETTINGS.defaults, null, 4));
});
