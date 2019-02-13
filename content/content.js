window.addEventListener('load', () => Util.windowLoaded(contentIsReady), false);

function contentIsReady() {
  Util.log(`content is ready, jquery v${$.fn.jquery} was loaded`);
  Styles.init();

  let settings;
  let dom = {
    extension: {
      containerId: CONSTANTS.EXTENSION_ELEMENT_ID,
      imgContainerId: `${CONSTANTS.EXTENSION_ELEMENT_ID}-image`,
    },
  };
  $.extend(dom, SOFTWARES);

  chrome.storage.onChanged.addListener(function(changes, areaName) {
    Util.log('chrome.storage.onChanged', changes.todaily);

    settings =
      (changes &&
        changes.todaily &&
        changes.todaily.newValue &&
        Object.keys(changes.todaily.newValue).length > 0 &&
        changes.todaily.newValue) ||
      SETTINGS.defaults;

    tryStartCountdown();
  });

  function tryStartCountdown() {
    const currState = getActivationState();
    if (currState.enable) {
      setTimeout(() => {
        CountDown.start(currState.text);
      }, 500);
    } else {
      Util.log('currState should not start countdown');
    }
  }

  const CountDown = {
    interval: null,
    clearance: function(delay) {
      delay = delay || 0;

      const _clearance = function() {
        const elem = $(`#${dom.extension.containerId}`);
        if (elem && elem.length !== 0) {
          elem.remove();
          Util.log('dom.extension.containerId removed');
        } else {
          Util.log('dom.extension.containerId doesnt exist');
        }
        const imgElem = $(`#${dom.extension.imgContainerId}`);
        if (imgElem && imgElem.length !== 0) {
          imgElem.remove();
          Util.log('dom.extension.imgContainerId removed');
        } else {
          Util.log('dom.extension.imgContainerId doesnt exist');
        }
        clearInterval(CountDown.interval);
      };
      if (delay) {
        setTimeout(() => {
          _clearance();
        }, delay);
      } else {
        _clearance();
      }
    },
    start: function(text) {
      CountDown.clearance();

      const countDownElem = $('<div>', {
        id: dom.extension.containerId,
        style: `-webkit-animation: fadein 1s; ${
          dom[settings.software].containerStyle
        }`,
      });

      $('body').append(countDownElem);

      let timeLeft = settings.countdownSeconds;

      const intervalHandler = () => {
        let countdownState;

        if (timeLeft <= 0) {
          CountDown.timeout();
          return;
        } else if (timeLeft <= settings.countdownSeconds * 0.3) {
          countdownState = settings.danger;
        } else if (timeLeft <= settings.countdownSeconds * 0.5) {
          countdownState = settings.warn;
        } else {
          countdownState = settings.safe;
        }

        countDownElem.css('background-color', countdownState.color);
        countDownElem.html(
          `${text} ${countdownState.text}, you have ${timeLeft} seconds left..`,
        );

        timeLeft -= 1;
      };

      CountDown.interval = setInterval(() => {
        intervalHandler();
      }, 1000);
      intervalHandler();
    },
    timeout: function() {
      clearInterval(CountDown.interval);
      var myAudio = new Audio();
      myAudio.src = chrome.extension.getURL('resources/alert.mp3');
      myAudio.play();

      const elem = $(`#${dom.extension.containerId}`);
      elem.html(settings.timeout.text);

      if (settings.timeout.imageUrl) {
        elem.after(
          $('<img>', {
            id: dom.extension.imgContainerId,
            src: settings.timeout.imageUrl,
            class: 'timeout-img',
          }),
        );
      }
      CountDown.clearance(5000);
    },
  };

  function getActivationState() {
    const elemActive = $(
      `${dom[settings.software].buttonsSelector}.${
        dom[settings.software].buttonActiveClass
      }`,
    );

    return {
      enable: elemActive.length === 1 && settings.enable,
      text: $(elemActive[0]).text(),
    };
  }

  chrome.storage.sync.get([CONSTANTS.STORAGE_NAME], todailySettings => {
    settings =
      (todailySettings &&
        todailySettings.todaily &&
        Object.keys(todailySettings.todaily).length > 0 &&
        todailySettings.todaily) ||
      SETTINGS.defaults;

    $(dom[settings.software].buttonsSelector).click(t => {
      Util.log('buttonSelector.clicked', t);
      tryStartCountdown();
    });

    Util.log('first try start countdown');
    tryStartCountdown();
  });
}
