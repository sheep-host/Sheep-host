import React from 'react';

const DataItem = (props) => {
	var dataResults = [];
	for (var value in props.info) {
		dataResults.push(<span className="data-key">{value.toString()}</span>, " : ", <b>{props.info[value]} |  </b>)
	}
	return (
		<li className = "i list-group-item" >
			{dataResults} 
		</li>
	)
}



export default DataItem;