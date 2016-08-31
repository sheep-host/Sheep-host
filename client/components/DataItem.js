// 		var dataResults = []
		// for (var value in this.props.info) {
		// 	dataResults.push( < em > {value.toString()} < /em>, " : " , <b> {this.props.info[value]} </b > )
		
		// }
// 		return (
		
				// <li className = "i list-group-item" >
				// {dataResults} 
				// </li>
			
// 		)
// 	}
// })



import React from 'react';

const DataItem = React.createClass({
	render() {
		console.log("props", this.props.info)
		var dataResults = [];
		for (var value in this.props.info) {

			dataResults.push(<em>{value.toString()}</em>, " : ", <b>{this.props.info[value]} ,     </b>)
			console.log('info', this.props.info)
		
		}
		return (
				<li className = "i list-group-item" >
				{dataResults} 
				</li>

			)
	}

})



export default DataItem;