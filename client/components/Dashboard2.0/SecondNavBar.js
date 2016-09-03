import React from 'react';


const SecondNavBar = React.createClass({
	getInitialState() {
	    return {
	          activeIndex: null
	    };
	},

	toggleColorAndDisplay(e) {
		console.log('this', e.target)
		this.props.click(e)
		
		console.log('E', e.target)
		
},

	render() {
		return (
			<div>
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