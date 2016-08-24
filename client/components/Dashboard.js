import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import InstructionsClick from './instructionsClick';
import ReactDOM from 'react-dom';
// import DatabaseForm from './DBInputComponent';
// import CollectionForm from './CollectionInputComponent'
// import DevInfo from './DisplayDevInfo';

const Dashboard = React.createClass({
	getInitialState () {
		return {
			isLoggedIn:false,
			database: '',
			userName: this.props.params.username,
			dbId: '',
			dbName: '',
			collectionName: '',
			schema:'',
			instructionsVisible: false,
			infoSubmitted: true

			
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.getData = this.getData.bind(this)
		this.onClick = this.onClick.bind(this);

	} 
},

	componentDidMount() {
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
			let dataArray = [];
			response.data.forEach(function(item){
				dataArray.push(item)
			})
			that.setState({dbName: _dbName, collectionName: _collectionName, dbId: _id, database: JSON.stringify(response.data), schema: _schema });
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
 
	onSubmit(e) {
		e.preventDefault();
		var _this = this
		(this.state.infoSubmitted)
		
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
				<h3> Welcome to your Dashboard, {this.props.params.username}</h3>
			<form onSubmit={this.onSubmit} >
				<DatabaseForm onChange={this.onDbNameChange} dbName={this.state.dbName} />
				<CollectionForm onChange={this.onCollectionNameChange} collectionName={this.state.collectionName} />
			</form>
				<DevInfo id={this.state.dbId} 
						 databaseName={this.state.dbName} 
						 collection={this.state.collectionName} 
						 database={this.state.database} />

				<InstructionsClick instructionsVisible={ this.state.instructionsVisible } onClick={ this.onClick }/>
			</div>
		)

	
 }
})



export default Dashboard;

