import React from 'react';
import DataItem from './DataItem';
const DevDatabase = React.createClass({
	
	render() {
	var dataItems=this.props.databaseInfo

		
		return (
			<div><h3>Your Shitty Database</h3>
			<div className="jumbotron">
			<ul className="list-group">
				{dataItems}
			</ul>
			</div>
			</div>
			)
	}


})


export default DevDatabase;
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