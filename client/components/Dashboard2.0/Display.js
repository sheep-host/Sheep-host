import React from 'react';
import DataItem from '../DataItem'

const Display = React.createClass({

	render() {
		var dataArray = []
		console.log('Display component render')
		this.props.display.forEach((el, i) => {
			dataArray.push(<DataItem className="list-item" key={i} info={el} />)
		})
		console.log('length', dataArray.length )
		return (
			<div className="jumbotron col-md-8">
				<ul className="list-group col-md-8">

							{dataArray}	
				</ul>
			</div>
		);
	}
})

export default Display;