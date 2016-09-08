import React from 'react';
import DataItem from '../DataItem'

const Display = (props) => {
	var dataArray = []
	console.log('Display component render')
	props.display.forEach((el, i) => {
		dataArray.push(<DataItem className="list-item" key={i} info={el} />)
	})
	return (
		<div className="display jumbotron col-md-10">
			<ul className="list-group col-md-10">
					{dataArray}	
			</ul>
		</div>
	);
}


export default Display;
