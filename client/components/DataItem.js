import React from 'react';

const DataItem = React.createClass({
	render() {
		
		var anotherArray =[]
		
			for(var value in this.props.info){
			var key=value.toString()
		
			anotherArray.push(<em> {value.toString()}</em>, " : " , <b> {this.props.info[value]} </b>)
			
		}
		
		return (
			
			<li className="list-group-item">
			
				{anotherArray}
			</li>
			)
	}
})




export default DataItem;