import React from 'react';


const SecondNavBar = React.createClass({
	getInitialState() {
	    return {
	          color: 'red'
	    };
	},

	toggleColorAndDisplay(e) {
		this.props.click(e)
		console.log('eeeee', e.target)
		
},

	render() {
		return (
			<div className="display">
				<ul className="nav nav-tabs col-md-8" data-toggle="button">
					<li><h3>Collections:</h3></li>
					{this.props.names.map((el, i)=> {
						return <button className="tabs btn btn-primary info" aria-pressed="true" onClick={this.toggleColorAndDisplay} id={i} key={i} name={el} role="button">{el}</button>;
					})}
				</ul>
			</div>
		)
	}
})

export default SecondNavBar;
