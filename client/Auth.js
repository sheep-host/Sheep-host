import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';

function loggedIn() {
  if (localStorage.sheepToken) {
    const sheepToken = jwtDecode(localStorage.sheepToken);
    console.log('token exp', sheepToken.exp * 1000, Date.now());
    if (sheepToken.exp * 1000 < Date.now()) return false;
    return true;
  }
  return false;
}

function redirect() {
  localStorage.clear();
  document.cookie.split(';').forEach((c) => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
  browserHistory.push('/login');
}

module.exports = { loggedIn, redirect };
