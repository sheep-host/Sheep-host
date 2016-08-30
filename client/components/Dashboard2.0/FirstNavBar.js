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
					{this.props.name}
				</ul>

			

			)
	}
})

export default FirstNavBar;