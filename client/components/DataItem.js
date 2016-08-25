import React from 'react';

const DataItem = React.createClass({
	render() {
		return (
			
			<li className="list-group-item">
			hi
				{this.props.info}
			</li>
			)
	}
})




export default DataItem;