$(function() {
  'use strict';

  document.title = `${APP_NAME} | Popup`;
  $('h1').html(APP_NAME);
  $('h2').html(SLOGAN);

  const dom = {
    enableCheckbox: $('#enableCheckbox'),
    savedTitle: $('#savedTitle'),
    countdownSecondsInput: $('#countdownSecondsInput'),
    safeColorInput: $('#safeColorInput'),
    safeTextInput: $('#safeTextInput'),
    warnColorInput: $('#warnColorInput'),
    warnTextInput: $('#warnTextInput'),
    dangerColorInput: $('#dangerColorInput'),
    dangerTextInput: $('#dangerTextInput'),
    timeoutTextInput: $('#timeoutTextInput'),
    timeoutImageInput: $('#timeoutImageInput'),
    saveBtn: $('#saveBtn'),
    clearBtn: $('#clearBtn'),
  };

  let settings;

  function updateSavedLabel(time) {
    dom.savedTitle.html(time ? 'Saved @' + time : '');
  }

  function setInputValuesFromSettings(givenSettings) {
    let customSettings;

    if (
      givenSettings &&
      typeof givenSettings === 'object' &&
      givenSettings.todaily &&
      Object.keys(givenSettings.todaily).length > 0
    ) {
      customSettings = givenSettings.todaily;
    }
    settings = customSettings || defaultSettings;
    updateSavedLabel(customSettings ? settings.time : null);
    dom.countdownSecondsInput.val(settings.countdownSeconds);
    dom.safeColorInput.val(settings.safe.color);
    dom.safeTextInput.val(settings.safe.text);
    dom.warnColorInput.val(settings.warn.color);
    dom.warnTextInput.val(settings.warn.text);
    dom.dangerColorInput.val(settings.danger.color);
    dom.dangerTextInput.val(settings.danger.text);
    if (settings.enable) dom.enableCheckbox.prop('checked', true);
    else dom.enableCheckbox.removeAttr('checked');
    dom.timeoutImageInput.val(settings.timeout.imageUrl);
    dom.timeoutTextInput.val(settings.timeout.text);
  }

  function getSettingsFromInputs() {
    return {
      enable: dom.enableCheckbox.is(':checked'),
      software: 'jira',
      countdownSeconds: dom.countdownSecondsInput.val(),
      timeout: {
        imageUrl: dom.timeoutImageInput.val(),
        text: dom.timeoutTextInput.val(),
      },
      danger: {
        color: dom.dangerColorInput.val(),
        text: dom.dangerTextInput.val(),
      },
      warn: {
        color: dom.warnColorInput.val(),
        text: dom.warnTextInput.val(),
      },
      safe: {
        color: dom.safeColorInput.val(),
        text: dom.safeTextInput.val(),
      },
    };
  }

  chrome.storage.sync.get(['todaily'], function(settings) {
    setInputValuesFromSettings(settings);
  });

  dom.clearBtn.click(function(element) {
    chrome.storage.sync.clear(function(obj) {
      setInputValuesFromSettings();
    });
  });

  dom.saveBtn.click(function(element) {
    const time = +new Date();
    let newSettings = getSettingsFromInputs();

    chrome.storage.sync.set(
      {
        todaily: {
          ...newSettings,
          time,
        },
      },
      function() {
        updateSavedLabel(time);
      },
    );
  });
});
