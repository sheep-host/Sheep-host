import React from 'react';

const DevInfo = (props) => {
	console.log('PROPS DEV INFO', props)
	return (
		<div className="well well-lg">
		<div><b>Your dev ID</b>: {props.id}</div>
		
		<li className>Your database: {props.databaseName}</li>
		<li className>Your collection: {props.collectionName}</li>
		<li className>Your Schema: {props.schema} </li>
		
		</div>

		)
}
export default DevInfo