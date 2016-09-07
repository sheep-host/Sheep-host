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
			<div className="display">
				<ul className="nav nav-tabs col-md-8" data-toggle="button">	
					<li><h3>Databases:</h3></li>
					{this.props.names.map((el, i)=> {
						return <button className="tabs btn btn-primary info" aria-pressed="true" role="button" onClick={this.props.click} id={i} key={i} role="presentation">{el}</button>;
					})}
				</ul>
			</div>
		)
	}
})

export default FirstNavBar;