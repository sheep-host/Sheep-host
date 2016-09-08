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
			<div className="display jumbotron">
				<ul className="list-group" style={{marginTop:'100px'}}>

							{dataArray}	
				</ul>
			</div>
		);
	}
})

export default Display;
