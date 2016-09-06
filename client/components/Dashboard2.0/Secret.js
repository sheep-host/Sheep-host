import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

export default class Secret extends Component {

	render() {
		let token = jwtDecode(localStorage.sheepToken);
		console.log(token);
		let secretKey = token.secretKey; 
		console.log('secret', secretKey);
		return (
			<div>
				<p>Your decoded secret key: {secretKey}</p>
			</div>
		);
	}
}