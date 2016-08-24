import React from 'react';

const DevInfo = (props) => {
	return (
		<div>
		<p>Your dev ID: {props.id}</p>
		<p>Your database: {props.databaseName}</p>
		<p>Your collection: {props.collectionName}</p>
		<p>Your data:</p>
		<div>{props.database}</div><br/>
		</div>

		)
}