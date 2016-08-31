import React from 'react';
import DataItem from '../DataItem'

const Display = React.createClass({

	render() {
		var dataArray = []
		console.log('THIS.props', this.props.display)
		this.props.display.forEach((el, i) => {
			dataArray.push(<DataItem className="list-item" key={i} info={el} />)
		})
		console.log('length', dataArray.length )
		return (
			<div className="jumbotron">
				<ul className="list-group">

							{dataArray}	
				</ul>
			</div>
		);
	}
})

export default Display;