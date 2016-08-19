import React from 'react';
import axios from 'axios';
//component will mount that goes to database and grabs users data and displays it

	// <input 
	// 			onChange={this.onChange}
	// 			placeholder="Schema"
	// 			value={this.state.Schema}
	// 			type="text"
	// 			name="Schema"
	// 		/>


class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: this.props.params.username,
			databaseName: '',
			collectionName: '',
			Schema:{username: 'string', password: 'string' }
		}
	
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value })
	}
 
	onSubmit(e) {
		axios.post('/createDB', this.state).then(function(response) {
			console.log('RESPONSE FROM DASHBOARD SUBMIT')
		}).catch(function(error) {
			console.log('error on dashboard onSubmit promise', error)
		})
	}

	render() {

	

		return (

		

			<div>
			<h3> Welcome to your Dashboard <em>{this.props.params.username}</em></h3>
			
		<form onSubmit={this.onSubmit}>			


			<input 
				onChange={this.onChange}
				placeholder="Database Name"
				value={this.state.databaseName}
				type="text"
				name="databaseName"
			/> 
			<input

				onChange={this.onChange} 
				placeholder="Collection Name"
				value={this.state.collectionName}
				type="text"
				name="collectionName"
				/>


			<button 
			className="btn btn-primary"> 
			 Create MongoDB </button>
			</form>
					
		</div>

			
			)
	}

 


}

export default Dashboard;