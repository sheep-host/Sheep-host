import React from 'react';

const DevInfo = (props) => {
	console.log('PROPS DEV INFO', props)
	return (
		<div className="panel panel-default">
		<div className="panel heading"><b>Your dev ID</b>: {props.id}</div>
		<ul className="list-group">
		<li className="list-group-item">Your database: {props.databaseName}</li>
		<li className="list-group-item">Your collection: {props.collectionName}</li>
		<li className="list-group-item">Your Schema: {props.schema} </li>
		</ul>
		</div>

		)
}
export default DevInfo