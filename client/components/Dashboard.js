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
			database: 'nothing',
			dbName:'',
			userName: this.props.params.username,
			collectionName:'',
			schema:'{"username": "String", "password": "String"}'
		}

		
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		
	} 

	componentDidMount() {
		console.log('COMPONENT DID MOUNT DASHBOARD')
	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value })
	}
 
	onSubmit(e) {
		e.preventDefault();
		var _this = this
		console.log('_THIS.state', _this.state)
		axios.post('/createDevDB', _this.state).then(function(response) {
			
			
			console.log('DASHBOARD STATE AFTER SUBMIT', _this.state)
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
				value={this.state.dbName}
				type="text"
				name="dbName"
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
				{this.state.database}
		</div>

			
			)
	}

 }

export default Dashboard;