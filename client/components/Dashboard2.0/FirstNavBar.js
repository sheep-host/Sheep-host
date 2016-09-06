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
			<div className="col-md-8">
				<ul className="nav nav-tabs span10">	
					<li><h3>Databases:</h3></li>
					{this.props.names.map((el, i)=> {
						return <button className="tabs btn btn-primary info span10" aria-pressed="true" role="button" onClick={this.props.click} id={i} key={i} role="presentation">{el}</button>;
					})}
				</ul>
			</div>
		)
	}
})

export default FirstNavBar;