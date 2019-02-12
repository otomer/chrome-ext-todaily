(function() {
  const TRACE = false;

  function log(text, obj) {
    if (TRACE) {
      if (obj) {
        console.log(`>>> ${text}`, obj);
      } else {
        console.log(`>>> ${text}`);
      }
    }
  }

  function jQueryDefer(method) {
    if (window.jQuery) {
      log('jQuery in window');
      method();
    } else {
      setTimeout(function() {
        log('check for jQuery in window');
        jQueryDefer(method);
      }, 500);
    }
  }

  function windowLoaded(fnReady) {
    jQueryDefer(() => {
      fnReady();
    });
  }

  window.Util = {
    log,
    jQueryDefer,
    windowLoaded,
  };
})();
