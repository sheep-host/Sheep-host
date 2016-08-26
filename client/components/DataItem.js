import React from 'react';

const DataItem = React.createClass({
	render() {
		console.log('DATA ITEM RENDER')
		var anotherArray =[]
		
			for(var value in this.props.info){
			var key=value.toString()
		
			anotherArray.push(<em> {value.toString()}</em>, " : " , <b> {this.props.info[value]} </b>)
			console.log('another array', anotherArray)
		}
		
		return (
			
			<li className="list-group-item">
			
				{anotherArray}
			</li>
			)
	}
})




export default DataItem;