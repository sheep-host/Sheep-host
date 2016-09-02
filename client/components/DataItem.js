import React from 'react';

const DataItem = React.createClass({
	render() {
		var dataResults = [];
		for (var value in this.props.info) {
			dataResults.push(<span className="data-key">{value.toString()}</span>, " : ", <b>{this.props.info[value]} |  </b>)
		}
		return (
			<li className = "i list-group-item" >
			{dataResults} 
			</li>
		)
	}
})



export default DataItem;