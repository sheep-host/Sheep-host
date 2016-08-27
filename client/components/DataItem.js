import React from 'react';

const DataItem = React.createClass({
	render() {
		var dataResults = []
		for (var value in this.props.info) {
			dataResults.push( < em > {value.toString()} < /em>, " : " , <b> {this.props.info[value]} </b > )
			console.log('dataResults', dataResults)
		}
		return (
		
				<li className = "list-group-item" >
				{dataResults} 
				</li>
			
		)
	}
})



export default DataItem;