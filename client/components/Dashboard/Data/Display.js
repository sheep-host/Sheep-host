import React from 'react';
import DataItem from './DataItem'

const Display = (props) => {
	var dataArray = []
	props.display.forEach((el, i) => {
		dataArray.push(<DataItem className="list-item" key={i} info={el} />)
	})
	return (
		<div className="display jumbotron">
			<ul className="list-group" style={{marginTop:'170px'}}>
					{dataArray}	
			</ul>
		</div>
	)
}


export default Display;
