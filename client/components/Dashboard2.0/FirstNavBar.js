import React from 'react';


const FirstNavBar = React.createClass({
	getInitialState() {
	    return {
	          selected: 'dbname'
	    };
	},

	render() {
		return (
			
				<ul className="nav nav-tabs">
				  <li role="presentation"><a href="#">props..databaseName</a></li>
				  <li role="presentation"><a href="#">props..databaseName</a></li>
				  <li role="presentation"><a href="#">props..databaseName</a></li>
				</ul>

			

			)
	}
})

export default FirstNavBar;