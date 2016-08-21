import React, { Component } from 'react';

export default class Instructions extends Component {

	render() {
		return (
			<div className='glossary'>
	      <ul>
	        <li>`The base URL for making AJAX calls to your database is http://localhost:3000/api/(your dev ID)`</li>
	        <li>To execute Put or Delete requests to your database, add /(_id) of the desired document</li>
	      </ul>
	     </div>
    );
  }
}