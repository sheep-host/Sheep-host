import React from 'react';

//component will mount that goes to database and grabs users data and displays it

class Dashboard extends React.Component {

	constructor() {
		super();
		this.state = {
			stuff: ''
		}
	}


	handleClick(e) {
		console.log(this.state, 'handleClick in Dashboard component')
		
	} 


	render() {

	console.log('DASHBOARD THIS.PROPS', this.props)

		return (

		

			<div>
			<h3> Welcome to your Dashboard <em>{this.props.params.username}</em></h3>
			

			<button 
			handleClick={this.handleClick}
			className="btn btn-primary" 
			type="submit"> Create MongoDB </button>
			
			</div>


			)
	}

 


}

export default Dashboard;