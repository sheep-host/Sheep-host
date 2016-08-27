import React from 'react';
import DataItem from './DataItem';

//this.props.databaseInfo is JSON stringified from earlier call.
const DevDatabase = React.createClass({
	render() {
	console.log('dev database component RENDER', this.props.databaseInfo)
	var dataArray = []
	this.props.databaseInfo.forEach(function(item, i) {
		dataArray.push(<DataItem key={i} info={item} />)
		
	})
	return (
			<div>
				<h3 className="Your-Database">Your Database </h3>
				<hr width="1200"></hr>
				<div className="jumbotron">
					<ul className="list-group">
						{dataArray}
					</ul>
				</div>
	
			</div>
		)
	}
})


module.exports = DevDatabase;


