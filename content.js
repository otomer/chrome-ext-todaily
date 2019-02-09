window.addEventListener('load', windowLoaded, false);

function contentIsReady() {
  log(`jquery v${$.fn.jquery} is now loaded`);
  let settings;
  let countDownInterval;

  let dom = {
    extension: {
      containerId: EXTENSION_ELEMENT_ID,
      imgContainerId: `${EXTENSION_ELEMENT_ID}-image`,
    },
  };

  $.extend(dom, SOFTWARES);

  chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (
      changes &&
      changes.todaily &&
      changes.todaily.newValue &&
      Object.keys(changes.todaily.newValue).length > 0
    ) {
      log('Storage updated', changes.todaily.newValue);

      settings = changes.todaily.newValue;

      if (settings.enable) {
        const startAfterChange = shouldStart();
        if (startAfterChange.result) {
          CountDown.start(startAfterChange.text);
        }
      } else {
        CountDown.stop();
      }
    } else {
      settings = defaultSettings;
      log('Cleared storage');
    }
  });

  const CountDown = {
    timeout: false,
    start: function(text) {
      CountDown.timeout = false;
      const elem = $(`#${dom.extension.containerId}`);
      if (!elem || elem.length === 0) {
        const countDownElem = $('<div>', {
          id: dom.extension.containerId,
          style:
            'text-align:center; height:30px; font-size:20px; color: white;',
        });
        $(dom[settings.software].containerId).before(countDownElem);

        let timeleft = settings.countdownSeconds;

        const intervalHandler = () => {
          countDownElem.html(timeleft);
          let countdownState;

          if (timeleft <= 0) {
            CountDown.stop(true);
            return;
          } else if (timeleft <= settings.countdownSeconds * 0.3) {
            countdownState = settings.danger;
          } else if (timeleft <= settings.countdownSeconds * 0.5) {
            countdownState = settings.warn;
          } else {
            countdownState = settings.safe;
          }

          countDownElem.css('background-color', countdownState.color);
          countDownElem.html(
            `${text} ${
              countdownState.text
            }, you have ${timeleft} seconds left..`,
          );
          timeleft -= 1;
        };

        countDownInterval = setInterval(function() {
          intervalHandler();
        }, 1000);
        intervalHandler();
      } else {
        log('Unsure what is this flow');
      }
    },
    stop: function(done) {
      const elem = $(`#${dom.extension.containerId}`);

      const fn = elem => {
        if (elem || elem.length !== 0) {
          elem.remove();
        }
        const imgElem = $(`#${dom.extension.imgContainerId}`);
        if (imgElem && imgElem.length !== 0) {
          imgElem.remove();
        }
      };

      const clear = () => {
        fn(elem);
        CountDown.timeout = false;
      };

      if (done) {
        clearInterval(countDownInterval);

        if (!CountDown.timeout) {
          CountDown.timeout = true;
          // const audio = new Audio(chrome.runtime.getURL('alert.mp3'));
          // audio.play();
          elem.html(settings.timeout.text);

          if (settings.timeout.imageUrl) {
            const img = $('<img>', {
              id: dom.extension.imgContainerId,
              src: settings.timeout.imageUrl,
              style:
                'position:fixed; z-index:99; height: 200px; top:50%; left:50%; margin-top: -100px;',
            });
            elem.after(img);
            setTimeout(function() {
              clear();
            }, 5000);
          } else {
            setTimeout(function() {
              clear();
            }, 5000);
          }
        }
      } else {
        clear();
      }
    },
  };

  function shouldStart() {
    const elemActive = $(
      `${dom[settings.software].buttonsSelector}.${
        dom[settings.software].buttonActiveClass
      }`,
    );

    return {
      result: elemActive.length === 1 && settings.enable,
      text: $(elemActive[0]).text(),
    };
  }

  chrome.storage.sync.get(['todaily'], function(todailySettings) {
    settings =
      (todailySettings &&
        todailySettings.todaily &&
        (Object.keys(todailySettings.todaily).length > 0 &&
          todailySettings.todaily)) ||
      defaultSettings;

    $(dom[settings.software].buttonsSelector).click(function(t) {
      const buttonStart = shouldStart();
      if (buttonStart.result) {
        CountDown.start(buttonStart.text);
      } else {
        CountDown.stop();
      }
    });

    const initStart = shouldStart();
    if (initStart.result) {
      setTimeout(function() {
        CountDown.start(initStart.text);
      }, 1000);
    }
  });
}

function defer(method) {
  if (window.jQuery) {
    log('jQuery in window');
    method();
  } else {
    setTimeout(function() {
      log('check for jQuery in window');
      defer(method);
    }, 500);
  }
}

function windowLoaded(evt) {
  defer(() => {
    contentIsReady();
  });
}
