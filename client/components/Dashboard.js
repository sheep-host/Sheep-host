import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie'
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
			database: '',
			userName: this.props.params.username,
			dbId: '',
			dbName: '',
			collectionName: '',
			schema:'{"username": "String", "password": "String"}'
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	} 

	componentDidMount() {
		let that = this;
		let _id = cookie.load('_id').slice(3,-1);
		axios.get('/api/'+_id).then(function(response) {
			that.setState({dbId: _id, database: JSON.stringify(response.data) });
		}).catch(function(error) {
			console.log(error)
		});
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
			
		<form onSubmit={this.onSubmit} >			


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
				<p>Your dev ID: {this.state.dbId}</p>
				<p>{this.state.database}</p>
		</div>

			
			)
	}

 }

export default Dashboard;