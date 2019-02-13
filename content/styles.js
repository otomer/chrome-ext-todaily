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
  position:fixed;
  z-index:99;
  height: 200px;
  top:50%;
  left:50%;
  margin-top: -100px;
}
.enabler {
  bottom: 46px;
    padding: 0;
    left: 5px;
    width: 45px;
    height: 45px;
    position: fixed;
    border: solid 1px #bbb;
    z-index: 99;
    border-radius: 5px;
    outline: none;
    font-weight:bold;
    cursor:pointer;
}
.enabler span:nth-child(1) {
  font-size:8px;
}
.enabler span:nth-child(2) {
  font-size:10px;
}
.enabler-on {
  background:#dac32a;
}

.enabler-off {
  background:#c8c8c8;
}

`;

  function init() {
    $('style').append(GENERAL);
  }

  window.Styles = {
    init,
  };
})();
