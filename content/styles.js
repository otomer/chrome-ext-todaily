(function() {
  let GENERAL = `
@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.timeout-img {
  position:fixed; z-index:99; height: 200px; top:50%; left:50%; margin-top: -100px;
}

`;

  function init() {
    $('style').append(GENERAL);
  }

  window.Styles = {
    init,
  };
})();
