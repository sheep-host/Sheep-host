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
					<li className="tabTitle">Collections:</li>
					{this.props.names.map((el, i)=> {
						return <li className="tab-button" onClick={this.props.click} id={i} key={i} role="presentation">{el}</li>;
					})}
				</ul>
			</div>
		)
	}
})

export default SecondNavBar;