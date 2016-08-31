import React from 'react';


const FirstNavBar = React.createClass({
	getInitialState() {
	    return {
	          selected: 'dbname'
	    };
	},

	render() {
		console.log('FirstNavBar render')

		return (
			<div>
				<ul className="nav nav-tabs">	
					<li>Databases:</li>
					{this.props.names.map((el, i)=> {
						return <li className="tab" onClick={this.props.click} id={i} key={i} role="presentation">{el}</li>;
					})}
				</ul>
			</div>
		)
	}
})

export default FirstNavBar;