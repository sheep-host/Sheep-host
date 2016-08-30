import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import InstructionsClick from './instructionsClick';
import ReactDOM from 'react-dom';
import DatabaseForm from './DBInputComponent';
import CollectionForm from './CollectionInputComponent'
import DevInfo from './DisplayDevInfo';
import Schemaform from './SchemaInput';
import DevDatabase  from './DevDatabase';
import jwtDecode from 'jwt-decode';
import ClientInput from './clientInput'
import DeveloperNavBar from './DeveloperNavBar';
import FirstNavBar from './Dashboard2.0/FirstNavBar'
import SecondNavBar from './Dashboard2.0/SecondNavBar'
// import getUserData from '../actions/GetData';
// setInterval(this.getData, 10000);

const Dashboard = React.createClass({
	getInitialState () {
		return {

			database: [],
			userName: this.props.params.username,
			dbId: '',
			dbName: '',
			collectionName: '',
			schema:'',
			instructionsVisible: false,
			collectionInView: ['Some collection'],

		}

	},  

	componentDidMount() {
	console.log('componentdidmount')
	this.getData();
	// setInterval(this.getData, 10000);
	}, 

	onClick() {
    	this.setState({instructionsVisible: !this.state.instructionsVisible});
  	},
 
	getData() {
		let that = this;
		let _id = cookie.load('_id').slice(3,-1);
		let _dbName = cookie.load('dbName');
		let _collectionName = cookie.load('collectionName');
		let schema = cookie.load('schema');
		let _schema = JSON.stringify(schema);
		
		axios.get('/api/'+_id).then(function(response) {
			console.log('GET DATA - RESPONSE.data', response.data)
			that.setState({dbName: _dbName, collectionName: _collectionName, dbId: _id, database: response.data, schema: _schema });
		}).catch(function(error) {
			console.log(error)
		});
	},

	onCollectionNameChange(e) {
		this.setState({collectionName: e.target.value })
		
	},
	
	onDbNameChange(e) {
		this.setState({dbName: e.target.value })
		
	},

	onSchemaChange(e) {
		this.setState({schema: e.target.value })
	},


 
	onSubmit(e) {
		e.preventDefault();
		var _this = this
		this.setState({infoSubmitted : true});
		console.log('_THIS.state', _this.state)
		axios.post('/createDevDB', _this.state).then(function(response) {
			console.log('DASHBOARD STATE AFTER SUBMIT', response)

		}).catch(function(error) {
			console.log('error on dashboard onSubmit promise', error)
		})
	},

	render() {
		return (
			<div>
				<h3 className="alert alert-info text-center" role="alert"> <b>Welcome to your Dashboard, {this.props.params.username}</b></h3>
				

				<FirstNavBar  />
				<SecondNavBar />
				
				
				

				<InstructionsClick instructionsVisible={ this.state.instructionsVisible } onClick={ this.onClick }/>
			</div>
		)

	}
})



export default Dashboard;




