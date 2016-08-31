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
				<ul className="nav nav-tabs">
					<li>Collections:</li>
					{this.props.names.map((el, i)=> {
						return <li className="btn-custom" onClick={this.props.click} id={i} key={i} role="presentation">{el}</li>;
					})}
				</ul>
			</div>
		)
	}
})

export default SecondNavBar;