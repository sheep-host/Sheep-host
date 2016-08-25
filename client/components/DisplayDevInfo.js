import React from 'react';

const DevInfo = (props) => {
	return (
		<div>
		<p>Your dev ID: {props.id}</p>
		<p>Your database: {props.databaseName}</p>
		<p>Your collection: {props.collectionName}</p>
		<p>Your Schema: {props.schema} </p>
		</div>

		)
}
export default DevInfo