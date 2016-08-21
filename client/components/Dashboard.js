import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import InstructionsClick from './instructionsClick';

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			database: '',
			userName: this.props.params.username,
			dbId: '',
			dbName: '',
			collectionName: '',
			schema:'',
			instructionsVisible: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.getData = this.getData.bind(this)
		this.onClick = this.onClick.bind(this);
	} 

	componentDidMount() {
		this.getData();
		setInterval(this.getData, 10000);
	}

	onClick() {
    	this.setState({instructionsVisible: !this.state.instructionsVisible});
  	}

	getData() {
		let that = this;
		let _id = cookie.load('_id').slice(3,-1);
		axios.get('/api/'+_id).then(function(response) {
			let dataArray = [];
			response.data.forEach(function(item){
				dataArray.push(item)
			})
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
			console.log('DASHBOARD STATE AFTER SUBMIT', response)

		}).catch(function(error) {
			console.log('error on dashboard onSubmit promise', error)
		})
	}

	render() {
		return (

			<div>
				<h3> Welcome to your Dashboard, {this.props.params.username}</h3>
				<form onSubmit={this.onSubmit} >			

				<input 
					onChange={this.onChange}
					placeholder="Database Name"
					value={this.state.dbName}
					type="text"
					name="dbName"
				/> <br/>

				<input
					onChange={this.onChange} 
					placeholder="Collection Name"
					value={this.state.collectionName}
					type="text"
					name="collectionName"
				/> <br/>

				<textarea
					onChange={this.onChange} 
					placeholder="Schema"
					value={this.state.schema}
					type="text"
					name="schema"
				/> <br/>

				<button 
					className="btn btn-primary"> 
					Create MongoDB
				</button>

				</form>
				<p>Your dev ID: {this.state.dbId}</p>
				<p>Your database: {this.state.dbName}</p>
				<p>Your collection: {this.state.collectionName}</p>
				<p>Your data:</p>
				<div>{this.state.database}</div><br/>
				<InstructionsClick instructionsVisible={ this.state.instructionsVisible } onClick={ this.onClick }/>
			</div>
		)
	}
 }

export default Dashboard;