import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import InstructionsClick from './instructionsClick';
import ReactDOM from 'react-dom';
import DatabaseForm from './DBInputComponent';
import CollectionForm from './CollectionInputComponent'
import DevInfo from './DisplayDevInfo';
import Schemaform from './SchemaInput';
import DevDatabase  from './DevDatabase';
import auth from '../Auth'
import jwtDecode from 'jwt-decode';
import ClientInput from './clientInput'
import DeveloperNavBar from './DeveloperNavBar';
import FirstNavBar from './Dashboard2.0/FirstNavBar';
import SecondNavBar from './Dashboard2.0/SecondNavBar';
import Display from './Dashboard2.0/Display';
// import getUserData from '../actions/GetData';
// setInterval(this.getData, 10000);

const Dashboard = React.createClass({
	getInitialState () {
		return {
			database: [],
			userName: this.props.params.username,
			dbId: '',
			dbNames: '',
			collectionName: '',
			schema:'',
			instructionsVisible: false,
			DBkeys: [],
			Colkeys: [],
			activeCollectionData: [],
			activeCollectionLink: 0,
			activeDBLink: 0,
		}
	},  
	
// 	componentDidMount() {
// 		if(!auth.loggedIn()){
// 			browserHistory.push("login");
// 		}
// 		let sheepToken = jwtDecode(localStorage.sheepToken);
// 		console.log('sheep token', sheepToken.exp, Date.now());
// 		this.getData();	

	componentDidMount() {
		this.getData()
	}, 

	onColClick(e) {
		if(auth.loggedIn()){
			let that = this.state;
			let activeCollectionLink = parseInt(e.target.id);
			let activeCollectionData = that.database[that.DBkeys[that.activeDBLink]][that.Colkeys[activeCollectionLink]];
			this.setState({activeCollectionLink, activeCollectionData });
			console.log(this.state);
		}
		else(auth.redirect());
	},

	onDBClick(e) {
		if(auth.loggedIn()){
			let that = this.state;
			let activeDBLink = parseInt(e.target.id);
			let Colkeys = Object.keys(that.database[that.DBkeys[activeDBLink]]);
			let activeCollectionData = that.database[that.DBkeys[activeDBLink]][Colkeys[0]];
			this.setState({activeDBLink, activeCollectionLink: 0, Colkeys, activeCollectionData });
			console.log(this.state);
		}
		else(auth.redirect());
	},
 
	getData() {
		let that = this;
		let _id = jwtDecode(localStorage.sheepToken).devID;
		// let _dbName = cookie.load('dbName');
		// let _collectionName = cookie.load('collectionName');
		// let schema = cookie.load('schema');
		// let _schema = JSON.stringify(schema);
		
		axios.get('/getDBs/'+_id).then(function(response) {
			var info = {};
			console.log('GET DATA - RESPONSE.data', response.data)
			var data = response.data;
			for(var i = 0; i < data.length; i++) {
				var currentCollection = (data[i].pop());
				if(!info[currentCollection.database]) info[currentCollection.database] = {};
				info[currentCollection.database][currentCollection.collection] = data[i];
			}

			console.log('INFO', info)
			console.log('keys', Object.keys(info))
			const DBkeys = Object.keys(info);
			const Colkeys = Object.keys(info[DBkeys[0]]);
			const activeCollectionData = info[DBkeys[0]][Colkeys[0]];
			that.setState({database: info, DBkeys, Colkeys, activeCollectionData});
			console.log(that.state)

		}).catch(function(error) {
			console.log(error)
		}); 
	},



	render() {
		return (
			<div>
				<h3 className="alert alert-info text-center" role="alert"> <b>Welcome to your Dashboard, {this.props.params.username}</b></h3>
				

				<FirstNavBar click={this.onDBClick} names={this.state.DBkeys} />
				<SecondNavBar click={this.onColClick} names={this.state.Colkeys} />
				<Display display={this.state.activeCollectionData} />


				<InstructionsClick instructionsVisible={ this.state.instructionsVisible } onClick={ this.onClick }/>
			</div>
		)

	}
})



export default Dashboard;




