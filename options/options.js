'use strict';

$(function() {
  document.title = `${APP_NAME} | About`;
  $('h1').html(APP_NAME);
  $('h2').html(SLOGAN);
  $('#defaultSettings').text(JSON.stringify(defaultSettings, null, 4));
});
