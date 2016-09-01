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
import SettingsNavBar from './Dashboard2.0/SettingsNavBar';
import UserProfile from './Dashboard2.0/UserProfileInfo.js';
import WelcomeBanner from './Dashboard2.0/WelcomeBanner';
// import getUserData from '../actions/GetData';
// setInterval(this.getData, 10000);

const Dashboard = React.createClass({
	getInitialState () {
		return {
			activeDBLink: 0,
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
			infoDisplayed: 'dashboard'
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
		console.log('component did mount');

		this.getData()
	},

	toggleInfoDisplayed(e) {
		console.log('e toggle info', e)
		this.setState({infoDisplayed: e.target.name})
		console.log('dashboard toggle info state', this.state)
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
		let sheepToken = jwtDecode(localStorage.sheepToken);
		let _id = sheepToken.devID;
		console.log('getData');
		let that = this;
		axios.get('/getDBs/'+_id).then(function(response) {
			let info = {};
			console.log('response', response)
			let data = response.data;
			for(let i = 0; i < data.length; i++) {
				let currentCollection = (data[i].pop());

				if(!info[currentCollection.database]) info[currentCollection.database] = {};
				info[currentCollection.database][currentCollection.collection] = data[i];
			}
			const DBkeys = Object.keys(info);
			const Colkeys = Object.keys(info[DBkeys[0]]);
			const activeCollectionData = info[DBkeys[0]][Colkeys[0]];

			that.setState({database: info, DBkeys, Colkeys, activeCollectionData});
		}).catch(function(error) {
			console.log('error on .catch', error)
		});
	},

	render() {
		console.log('STATE', this.state)
		if(this.state.infoDisplayed ==='dashboard') {
			return (

				<div>
					<WelcomeBanner name={this.state.userName}/>
					<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
					<FirstNavBar click={this.onDBClick} names={this.state.DBkeys} />
					<SecondNavBar click={this.onColClick} names={this.state.Colkeys} />
					<Display display={this.state.activeCollectionData} />

					<InstructionsClick instructionsVisible={ this.state.instructionsVisible } onClick={ this.onClick }/>
				</div>
			)
		}
		if(this.state.infoDisplayed === 'create') {
			return (
				<div>
					<WelcomeBanner name={this.state.userName}/>
					<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
					<ClientInput />
				</div>
			)
		}
		if(this.state.infoDisplayed === 'profile') {
			return(
				<div>
					<WelcomeBanner name={this.state.userName}/>
					<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
					<UserProfile />
				</div>
			)
		}
	}
})

export default Dashboard;
