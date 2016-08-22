import React, { Component } from 'react';

export default class Instructions extends Component {

	render() {
		return (
			<div className='glossary'>
	      <ul>
	        <li>The base URL for making AJAX calls to your database is http://localhost:3000/api/(your dev ID)</li>
	        Example: http://localhost:3000/api/57bb39e95e7e6a6c2887bd95
	        <li>To execute Put or Delete requests on specific documents, add /(_id) of the desired document to the end of the URL</li>
	        Example: http://localhost:3000/api/57bb39e95e7e6a6c2887bd95/57bb3bba5e7e6a6c2887bda8
	      </ul>
	     </div>
    );
  }
}