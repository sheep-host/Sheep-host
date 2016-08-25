const jwtDecode = require('jwt-decode');

function loggedIn() {
  console.log('in logged in', localStorage.sheepToken);
  return !!localStorage.sheepToken;
}

module.exports = { loggedIn }