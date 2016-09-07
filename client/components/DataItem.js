import React from 'react';

const DataItem = React.createClass({
	render() {
		var dataResults = [];
		for (var value in this.props.info) {
			dataResults.push(<span style={{fontSize:'20px'}} className="data-key">{value.toString()}</span>, " : ", <b style={{fontSize:'20px'}}>{this.props.info[value]} |  </b>)
		}
		return (
			<li className = "i list-group-item" >
			{dataResults} 
			</li>
		)
	}
})



export default DataItem;