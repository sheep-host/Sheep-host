const jwtDecode = require('jwt-decode');
import { browserHistory } from 'react-router';


function loggedIn() {
	console.log('loggedin');
	if(localStorage.sheepToken){
		let sheepToken = jwtDecode(localStorage.sheepToken);
		console.log(sheepToken.exp, Date.now());
		if(sheepToken.exp * 1000 < Date.now()) return false;
		else return true;
	}
}

function redirect() {
	console.log('redirect');
	localStorage.clear();
	document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
	browserHistory.push('/login');
}
module.exports = { loggedIn, redirect }