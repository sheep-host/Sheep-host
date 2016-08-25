import React from 'react';
import DataItem from './DataItem';

//this.props.databaseInfo is JSON stringified from earlier call.
const DevDatabase = React.createClass({
	
	render() {
	var DataItems=this.props.databaseInfo
	console.log('DataItems', JSON.parse(DataItems))
	for(var i = 0; i < 5; i++) {
		console.log('FORLOOP',i)
	}
		
		return (
			<div><h3>Your Database </h3>
			<div className="jumbotron">
			<ul className="list-group">
				{DataItems}
			</ul>
			</div>
			</div>
			)
	}


})


export default DevDatabase;
				{DataItems.map(function(item, i) {
					return <DataItem className="list-group-item" key={i} info={item} />
				})}

// <li className="list-group-item">{dataItems}</li>}

	// var userDbInfo=this.props.databaseInfo
	// console.log('USERDBINFO', userDbInfo)
	// var dataItems=[];
	
	// for(var i = 0; i < userDbInfo; i++) {
	// 	dataItems.push(<li className="list-group-item" key={i}>userDbInfo[i]</li>)
	// 	console.log('DATAITEMS', dataItems)
	// }

			// <ul className="list-group">
				// {dataItems.map(function(item, i) {
				// 	return <li className="list-group-item">{item}</li>
				// })}

		// var dataItems=[];
		// {this.props.map((item, i) => {
		// 	<li className="list-group-item">{item}</li>
		// })}

				// {this.props.databaseInfo.map((item, i) => {
				// 	<li className="list-group-item" key={i}>{item}</li>
				// }})