import React from 'react';


const SecondNavBar = React.createClass({
	getInitialState() {
	    return {
	          selected: 'dbname'
	    };
	},

	render() {
		return (
				<div>
					<ul className="nav nav-pills">
					  <li role="presentation"><a href="#">Collection 1</a></li>
					  <li role="presentation"><a href="#">Collection 2</a></li>
					  <li role="presentation"><a href="#">Collection 3</a></li>
					</ul>
				</div>
			

			)
	}
})

export default SecondNavBar;