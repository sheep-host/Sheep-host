import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import InstructionsClick from './InstructionsClick';
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
import PublicAPI from './PublicAPI';
import ApiSandbox from './Dashboard2.0/apiSandbox';
// import getUserData from '../actions/GetData';
// setInterval(this.getData, 10000);

const Dashboard = React.createClass({
	getInitialState () {
		return {
			database: [],
			userName: this.props.params.username,
			_id: '',
			instructionsVisible: false,
			DBkeys: [],
			Colkeys: [],
			activeCollectionData: [],
			activeCollectionLink: 0,
			activeDBLink: 0,
			infoDisplayed: 'dashboard',
			schema:'',
			dbName: '',
			collectionName: '',
			fetchInterval: 0
		}
	},

	componentDidMount() {
		localStorage.sheepToken = cookie.load('token');
		let token = jwtDecode(localStorage.sheepToken);
		let authKey = token.authKey;
		this.setState({authKey});
		this.getData();
	},

  getData() {
		let that = this;
		let _id = jwtDecode(localStorage.sheepToken).devID;
		axios.get('/getDBs/'+_id).then(function(response) {
			if(response.data.length> 0){
				let info = {};
				let data = response.data;
				for(let i = 0; i < data.length; i++) {
					let currentCollection = (data[i].pop());

					if(!info[currentCollection.database]) info[currentCollection.database] = {};
					info[currentCollection.database][currentCollection.collection] = data[i];
				}
				const DBkeys = Object.keys(info);
				const Colkeys = Object.keys(info[DBkeys[0]]);
				const activeCollectionData = info[DBkeys[0]][Colkeys[0]];
				that.setState({_id, database: info, DBkeys, Colkeys, activeCollectionData});
			}
			else{
				that.setState({_id})
			}
		}).catch(function(error) {
			console.log('error on .catch', error)
		});
	},

	componentDidUpdate(){
		if(!auth.loggedIn()){
			clearInterval(fetchInterval);
			fetchInterval = 0;
		}
		if(auth.loggedIn() && this.state.DBkeys.length > 0 ){
			if(!this.state.fetchInterval) this.state.fetchInterval = setInterval(this.fetchData, 1000);
			else{
				clearInterval(this.state.fetchInterval);
				this.state.fetchInterval = 0;
				this.state.fetchInterval = setInterval(this.fetchData, 1000);
			}
		}
	}, 

	fetchData(){
		let that = this;
		const _id = that.state._id;
		const _dbName = that.state.DBkeys[that.state.activeDBLink];
		const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
		const link = _id + '/' + _dbName + '/' + _collectionName;
		console.log('link', link);
		axios({
			method: 'get',
			baseURL: 'http://localhost:3000/api/',
			url: link,
			headers: {Authorization: 'Bearer '+ localStorage.sheepToken}
		}).then(function(response){
			console.log('fetch', response);
			that.state.database[_dbName][_collectionName] = response.data;
			that.setState({activeCollectionData: response.data, database: that.state.database})
		})
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

	onCreateChange(e) {
		this.setState({e.target.name: e.target.value });
	},

	onCreateClick(e){
		e.preventDefault();
		let that = this;
		let data = {};
		let link = '/create/';
		if(that.state.DBkeys.indexOf(that.state.dbName) === -1){
			link += 'database';
			data.database = that.state.dbName;
			data._id = that.state._id;
		}
		else{
			link += that.state._id + '/' + that.state.dbName
		}
		data.collectionName = that.state.collectionName;
		data.schema = that.state.schema;
		console.log(link, data);
		axios.post(link, data).then(function(response){
			console.log(response);
			let db = response.data;
			let dbName = db.name;
			let collectionName = db.collections[db.collections.length-1].name;
			let database = that.state.database;
			let DBkeys = that.state.DBkeys;
			if(DBkeys.indexOf(dbName) === -1){
				database[dbName] = {};
				DBkeys.push(dbName);
			}
			console.log(database, db, dbName, collectionName);
			database[dbName][collectionName] = [];
			dbName = '';
			collectionName = '';
			let schema = '';
			let infoDisplayed = 'dashboard';
			that.setState({infoDisplayed, database, DBkeys, dbName, collectionName, schema})
		}).catch(function(error){
			console.log('error on create submit', error);
		})
	},

	onPostClick(e){
		e.preventDefault();
		console.log('post click event', e);
	},

	onPutClick(e){
		e.preventDefault();
	},

	onDeleteClick(e){
		e.preventDefault();
	},

	render() {
		let profileInfo = {};
		profileInfo['userName'] = this.state.userName
		for(let name in this.state.database) {
			profileInfo[name] = Object.keys(this.state.database[name])
		}
		if(!this.state.activeCollectionData){
			let collectionData = "This collection is empty."
		}
		else{let collectionData = this.state.activeCollectionData;}
		if(this.state.infoDisplayed ==='dashboard') {
			return (

				<div>
					<WelcomeBanner name={this.state.userName}/>
					<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
					<FirstNavBar click={this.onDBClick} names={this.state.DBkeys} />
					<SecondNavBar click={this.onColClick} names={this.state.Colkeys} />
          <Display display={this.state.activeCollectionData} />
          <ApiSandbox
          	postClick={this.onPostClick}
          	putClick={this.onPutClick}
          	deteletClick={this.onDeteletClick}
          />
          <PublicAPI devId={this.state._id} authKey={this.state.authKey} />
				</div>
			)
		}
		if(this.state.infoDisplayed === 'create') {
			return (
				<div>
					<WelcomeBanner name={this.state.userName}/>
					<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
					<ClientInput
						onCreateChange={this.onCreateChange}
						onCreateClick={this.onCreateClick}
					 />
				</div>
			)
		}
		if(this.state.infoDisplayed === 'profile') {
			return(
				<div>
					<WelcomeBanner name={this.state.userName}/>
					<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
					<UserProfile profileInfo={profileInfo}/>
				</div>
			)
		}
	}
})

export default Dashboard;

