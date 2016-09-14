import React from 'react';

const DataItem = (props) => {
	var dataResults = [];
	for (var value in props.info) {
		dataResults.push(<span key={props.keys+value} className="data-key">{value.toString()}</span>, " : ", <b key={props.keys+props.info[value]}>{props.info[value]} |  </b>)
	}
	return (
		<li className = "i list-group-item" >
			{dataResults} 
		</li>
	)
}



export default DataItem;