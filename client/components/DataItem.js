import React from 'react';

const DataItem = React.createClass({
	render() {
		return (
			
			<li className="list-group-item">
				{this.props.iteminfo}
			</li>
			)
	}
})




export default DataItem;