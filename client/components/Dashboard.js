import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import auth from '../Auth'
import jwtDecode from 'jwt-decode';
import ClientInput from './clientInput'
import NavigationBar from './NavigationBar';
import FirstNavBar from './Dashboard2.0/FirstNavBar';
import SecondNavBar from './Dashboard2.0/SecondNavBar';
import Display from './Dashboard2.0/Display';
import SettingsNavBar from './Dashboard2.0/SettingsNavBar';
import UserProfile from './Dashboard2.0/UserProfileInfo.js';
import Docs from './Docs';
import WelcomeBanner from './Dashboard2.0/WelcomeBanner';
import PublicAPI from './PublicAPI';
import ApiSandbox from './Dashboard2.0/apiSandbox';
import schemaParser from '../../database/methods/schemaParser';
import Permissions from './Dashboard2.0/PermissionsForm';

const Dashboard = React.createClass({
	getInitialState () {
		return {
			database: [],
			userName: this.props.params.username,
			_id: ' ',
			email:' ',
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
			fetchInterval: 0,
			postInput:'',
			putInput:'',
			putQuery: '',
			deleteQuery:'',
			secretKeyVisible: false,
			authKey: '',
			permissions: {}
		}
	},

	componentWillMount(){
		document.body.style.background = "white";
		localStorage.sheepToken = cookie.load('token');
		let token = jwtDecode(localStorage.sheepToken);
		let authKey = token.authKey;
		let email = token.email;
		let permissions = token.permissions;
		console.log('token', token);
		console.log('permissions',token.permissions, permissions);
		this.setState({authKey, email, permissions});
	},

	componentDidMount() {
		document.body.style.background = "white";
		this.getData();
	},

  getData() {
		let that = this;
		let _id = jwtDecode(localStorage.sheepToken).devID;
		console.log('getData _id',_id);
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
			clearInterval(this.state.fetchInterval);
			this.state.fetchInterval = 0;
			console.log('interval stopped');
		}
		if(auth.loggedIn() && this.state.DBkeys.length > 0 && this.state.Colkeys.length > 0){
			if(!this.state.fetchInterval) this.state.fetchInterval = setInterval(this.fetchData, 10000);
			else{
				clearInterval(this.state.fetchInterval);
				this.state.fetchInterval = 0;
				this.state.fetchInterval = setInterval(this.fetchData, 10000);
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
			baseURL: 'https://sheep.host/api/',
			url: link,
			headers: {Authorization: 'Bearer '+ localStorage.sheepToken}
		}).then(function(response){
			console.log('fetch', response);
			that.state.database[_dbName][_collectionName] = response.data;
			that.setState({activeCollectionData: response.data, database: that.state.database})
		})
	},

	componentWillUnmount(){
		clearInterval(this.state.fetchInterval);
		this.state.fetchInterval = 0;
		console.log('interval stopped');
	},


	toggleInfoDisplayed(e) {
		this.setState({infoDisplayed: e.target.name})
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

	onChange(e) {
		this.setState({[e.target.name]: e.target.value });
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
			alert('Created Successfully')
			that.setState({database, DBkeys, dbName, collectionName, schema})
		}).catch(function(error){
			console.log('error on create submit', error);
		})
	},

	onPostClick(e){
		e.preventDefault();
		let that = this;
		const _id = that.state._id;
		let post = JSON.parse(that.state.postInput);
		const _dbName = that.state.DBkeys[that.state.activeDBLink];
		const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
		const link = _id +'/'+ _dbName +'/'+ _collectionName
		axios({
			method: 'post',
			baseURL: 'http://sheep.host/api/',
			url: link,
			headers: {Authorization: 'Bearer '+ localStorage.sheepToken},
			data: post
		}).then(function(response){
			that.setState({postInput:''})
		}).catch(function(error){
			console.log('error posting to the database', error);
		})
	},

	onPutClick(e){
		e.preventDefault();
		let that = this;
		const _id = that.state._id;
		const put = JSON.parse(that.state.putInput);
		const _putQuery = JSON.parse(that.state.putQuery);
		const _putKey = Object.keys(_putQuery)[0];
		const _putValue = _putQuery[_putKey];
		console.log('put', put);
		const _dbName = that.state.DBkeys[that.state.activeDBLink];
		const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
		const link = _id +'/'+ _dbName +'/'+ _collectionName  + '/?' + _putKey + '=' + _putValue;
		axios({
			method: 'put',
			baseURL: 'http://sheep.host/api/',
			url: link,
			headers: {Authorization: 'Bearer '+ localStorage.sheepToken},
			data: put
		}).then(function(response){
			console.log(response)
		}).catch(function(error){
			console.log('error posting to the database', error);
		})
	},

	onDeleteClick(e){
		e.preventDefault();
		let that = this;
		const _id = that.state._id;
		const _deleteQuery = JSON.parse(that.state.deleteQuery);
		const _deleteKey = Object.keys(_deleteQuery)[0];
		const _deleteValue = _deleteQuery[_deleteKey];
		const _dbName = that.state.DBkeys[that.state.activeDBLink];
		const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
		const link = _id +'/'+ _dbName +'/'+ _collectionName + '/?' + _deleteKey + '=' + _deleteValue;
		axios({
			method: 'delete',
			baseURL: 'http://sheep.host/api/',
			url: link,
			headers: {Authorization: 'Bearer '+ localStorage.sheepToken}
		}).then(function(response){
			console.log(response)
		}).catch(function(error){
			console.log('error posting to the database', error);
		})
	},

	onSecretClick() {
    this.setState({secretKeyVisible: !this.state.secretKeyVisible});
  },

  onPermissionsClick(e) {
  	e.preventDefault();
  	let that = this;
  	console.log('permissionRadioChange', e.target.value);
  	let permissions = that.state.permissions;
  	let permission = e.target.value;
  	permissions[permission] = !permissions[permission]
  	this.setState({permissions});
  },

  savePermissions(e){
  	e.preventDefault();
  	let data = {};
  	let encoded = this.state.authKey;
		let decoded = new Buffer(encoded, 'base64').toString('utf8');
		let apiKey = decoded.split(':')[0];
		data['apiKey'] = apiKey;
  	let permissions = this.state.permissions;
  	data['permissions'] = permissions;
		axios({
			method: 'post',
      baseURL: 'http://sheep.host/',
			url: 'permission',
			headers: {Authorization: 'Bearer '+ localStorage.sheepToken},
			data: data
		}).then(function(response){
			console.log(response);
		})
  },

	render() {
		let encoded = this.state.authKey;
		let decoded = new Buffer(encoded, 'base64').toString('utf8');
		let apiKey = decoded.split(':')[0];
		let clientKey = decoded.split(':')[1];
		let profileInfo = {};

		profileInfo['Username'] = this.state.userName;
		profileInfo['Developer ID'] = this.state._id;
		profileInfo['API Key'] = apiKey;
		profileInfo['Client Key'] = clientKey;
		for(let name in this.state.database) {
			profileInfo[name] = Object.keys(this.state.database[name])
		}
		if(!this.state.activeCollectionData){
			let collectionData = "This collection is empty."
		}
		else{let collectionData = this.state.activeCollectionData;}
		return (
			<div>
				<NavigationBar />
				<WelcomeBanner name={this.state.userName}/>
				<SettingsNavBar toggle={this.toggleInfoDisplayed}/>
				{this.state.infoDisplayed === 'dashboard' &&
					<div>
						<FirstNavBar click={this.onDBClick} names={this.state.DBkeys} />
						<SecondNavBar click={this.onColClick} names={this.state.Colkeys} />
			      <Display display={this.state.activeCollectionData} />
			      <ApiSandbox
			      	postClick={this.onPostClick}
			      	postInput={this.state.postInput}
			      	putClick={this.onPutClick}
			      	deleteClick={this.onDeleteClick}
			      	onChange={this.onChange}/>
		    	</div>
		    }
        {this.state.infoDisplayed === 'create' &&
      		<div>
      			<ClientInput
							onChange={this.onChange}
							onCreateClick={this.onCreateClick}/>
					</div>
				}
			 {this.state.infoDisplayed === 'profile' &&
					<div>
						<UserProfile
							authKey={this.state.authKey}
							profileInfo={profileInfo}
							onClick={this.onSecretClick}
							secretKeyVisible={this.state.secretKeyVisible} />
						<Permissions
							permissions={this.state.permissions}
							onClick={this.onPermissionsClick}
							savePermissions={this.savePermissions} />
						<PublicAPI devId={this.state._id} authKey={this.state.authKey} />
					</div>
				}
				{this.state.infoDisplayed === 'docs' &&
					<div>
						<Docs />
					</div>
				}
			</div>
		)	
	}
})

export default Dashboard;
