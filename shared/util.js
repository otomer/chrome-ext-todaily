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
