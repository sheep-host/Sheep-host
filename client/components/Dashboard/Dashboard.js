import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import auth from '../../Auth';
import NavigationBar from '../NavigationBar';
import DashNavBar from './DashNavBar';
import DBNavBar from './Data/DBNavBar';
import ColNavBar from './Data/ColNavBar';
import Display from './Data/Display';
import ApiSandbox from './Data/apiSandbox';
import ClientInput from './Create/clientInput';
import validateCreateDBInput from './Create/createDBValidation';
import UserProfile from './Profile/UserProfileInfo.js';
import PublicAPI from './Profile/PublicAPI';
import Permissions from './Profile/PermissionsForm';
import Docs from './Docs/Docs';
import env from '../../../.env';

const path = env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://sheep.host/';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: [],
      userName: this.props.params.username,
      _id: ' ',
      email: ' ',
      instructionsVisible: false,
      DBkeys: [],
      Colkeys: [],
      activeCollectionData: [],
      activeCollectionLink: 0,
      activeDBLink: 0,
      infoDisplayed: 'dashboard',
      schema: '',
      dbName: '',
      collectionName: '',
      fetchInterval: 0,
      postInput: '',
      putInput: '',
      putQuery: '',
      deleteQuery: '',
      secretKeyVisible: false,
      authKey: '',
      permissions: {},
      createDBError: {},
    };
    this.getData = this.getData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.toggleInfoDisplayed = this.toggleInfoDisplayed;
    this.onColClick = this.onColClick;
    this.onDBClick = this.onDBClick;
    this.onChange = this.onChange;
    this.onCreateClick = this.onCreateClick;
    this.onPostClick = this.onPostClick;
    this.onPutClick = this.onPutClick;
    this.onDeleteClick = this.onDeleteClick;
    this.onSecretClick = this.onSecretClick;
    this.onPermissionsClick = this.onPermissionsClick;
    this.savePermissions = this.savePermissions;
  }

  componentWillMount() {
    document.body.style.background = 'white';
    if (!localStorage.sheepToken) localStorage.sheepToken = cookie.load('token');
    const token = jwtDecode(localStorage.sheepToken);
    const authKey = token.authKey;
    const email = token.email;
    const permissions = token.permissions;
    this.setState({ createDBError: [], authKey, email, permissions });
  }

  componentDidMount() {
    document.body.style.background = 'white';
    this.getData();
  }

  onColClick(e) {
    if (auth.loggedIn()) {
      const that = this.state;
      const activeCollectionLink = parseInt(e.target.id, 10);
      const activeCollectionData = that.database[that.DBkeys[that.activeDBLink]][that.Colkeys[activeCollectionLink]];
      this.setState({ activeCollectionLink, activeCollectionData });
    } else auth.redirect();
  }

  getData() {
    const that = this;
    const _id = jwtDecode(localStorage.sheepToken).devID;
    const link = `/getDBs/${_id}`;
    axios({
      method: 'get',
      baseURL: path,
      url: link,
      headers: { Authorization: `Bearer${localStorage.sheepToken}` },
    }).then((response) => {
      console.log('big data dump', response);
      if (response.data.length > 0) {
        const info = {};
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          const currentCollection = (data[i].pop());

          if (!info[currentCollection.database]) info[currentCollection.database] = {};
          info[currentCollection.database][currentCollection.collection] = data[i];
        }
        const DBkeys = Object.keys(info);
        const Colkeys = Object.keys(info[DBkeys[0]]);
        const activeCollectionData = info[DBkeys[0]][Colkeys[0]];
        that.setState({ _id, database: info, DBkeys, Colkeys, activeCollectionData });
      } else that.setState({ _id });
    }).catch((error) => {
      console.log('error on .catch', error);
    });
  }

  componentDidUpdate() {
    if (!auth.loggedIn()) {
      clearInterval(this.state.fetchInterval);
      this.state.fetchInterval = 0;
    }
    if (auth.loggedIn() && this.state.DBkeys.length > 0 && this.state.Colkeys.length > 0) {
      if (!this.state.fetchInterval) this.state.fetchInterval = setInterval(this.fetchData, 1000);
      else {
        clearInterval(this.state.fetchInterval);
        this.state.fetchInterval = 0;
        this.state.fetchInterval = setInterval(this.fetchData, 1000);
      }
    }
  }

  fetchData() {
    const that = this;
    const _id = that.state._id;
    const _dbName = that.state.DBkeys[that.state.activeDBLink];
    const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
    const link = `api/${_id}/${_dbName}/${_collectionName}`;
    axios({
      method: 'get',
      baseURL: path,
      url: link,
      headers: { Authorization: `Bearer ${localStorage.sheepToken}` },
    }).then((response) => {
      that.state.database[_dbName][_collectionName] = response.data;
      that.setState({ activeCollectionData: response.data, database: that.state.database });
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.fetchInterval);
    this.state.fetchInterval = 0;
  }


  toggleInfoDisplayed(e) {
    this.setState({ infoDisplayed: e.target.name });
  }

  onDBClick(e) {
    if (auth.loggedIn()) {
      const that = this.state;
      const activeDBLink = parseInt(e.target.id, 10);
      const Colkeys = Object.keys(that.database[that.DBkeys[activeDBLink]]);
      const activeCollectionData = that.database[that.DBkeys[activeDBLink]][Colkeys[0]];
      this.setState({ activeDBLink, activeCollectionLink: 0, Colkeys, activeCollectionData });
    } else auth.redirect();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCreateClick(e) {
    e.preventDefault();
    const that = this;
    const formCheck = {};
    formCheck['dbName'] = this.state.dbName;
    formCheck['collectionName'] = this.state.collectionName;
    formCheck['schema'] = this.state.schema;
    const { errors, isValid } = validateCreateDBInput(formCheck);
    if (!isValid) {
      that.setState({ createDBError: errors });
    } else {
      const data = {};
      let link = '/create/';
      if (that.state.DBkeys.indexOf(that.state.dbName) === -1) {
        link += 'database';
        data.database = that.state.dbName;
        data._id = that.state._id;
      } else {
        link += `${that.state._id}/${that.state.dbName}`;
      }

      data.collectionName = that.state.collectionName;
      data.schema = that.state.schema;

      axios.post(link, data).then((response) => {
        const db = response.data;
        let dbName = db.name;
        let collectionName = db.collections[db.collections.length - 1].name;
        const database = that.state.database;
        const DBkeys = that.state.DBkeys;
        if (DBkeys.indexOf(dbName) === -1) {
          database[dbName] = {};
          DBkeys.push(dbName);
        }
        database[dbName][collectionName] = [];
        dbName = '';
        collectionName = '';
        const schema = '';
        that.setState({ createDBError: {}, database, DBkeys, dbName, collectionName, schema });
      }).catch((error) => {
        that.setState({ createDBError: { schema: error.data.error } });
      });
    }
  }

  onPostClick(e) {
    e.preventDefault();
    const that = this;
    const _id = that.state._id;
    const post = JSON.parse(that.state.postInput, 10);
    const _dbName = that.state.DBkeys[that.state.activeDBLink];
    const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
    const link = `api/${_id}/${_dbName}/${_collectionName}`;
    axios({
      method: 'post',
      baseURL: path,
      url: link,
      headers: { Authorization: `Bearer ${localStorage.sheepToken}` },
      data: post,
    }).then((response) => {
      that.setState({ postInput: '' });
    }).catch((error) => {
      console.log('error posting to the database', error);
    });
  }

  onPutClick(e) {
    e.preventDefault();
    const that = this;
    const _id = that.state._id;
    const put = JSON.parse(that.state.putInput);
    const _putQuery = JSON.parse(that.state.putQuery);
    const _putKey = Object.keys(_putQuery)[0];
    const _putValue = _putQuery[_putKey];
    const _dbName = that.state.DBkeys[that.state.activeDBLink];
    const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
    const link = `api/${_id}/${_dbName}/${_collectionName}/?${_putKey}=${_putValue}`;
    axios({
      method: 'put',
      baseURL: path,
      url: link,
      headers: { Authorization: `Bearer ${localStorage.sheepToken}` },
      data: put,
    }).then((response) => {
      that.setState({ putInput: '' });
    }).catch((error) => {
      console.log('error posting to the database', error);
    });
  }

  onDeleteClick(e) {
    e.preventDefault();
    const that = this;
    const _id = that.state._id;
    const _deleteQuery = JSON.parse(that.state.deleteQuery);
    const _deleteKey = Object.keys(_deleteQuery)[0];
    const _deleteValue = _deleteQuery[_deleteKey];
    const _dbName = that.state.DBkeys[that.state.activeDBLink];
    const _collectionName = that.state.Colkeys[this.state.activeCollectionLink];
    const link = `api/${_id}/${_dbName}/${_collectionName}/?${_deleteKey}=${_deleteValue}`;
    axios({
      method: 'delete',
      baseURL: path,
      url: link,
      headers: { Authorization: `Bearer + ${localStorage.sheepToken}` },
    }).then((response) => {
      that.setState({ deleteInput: '' });
    }).catch((error) => {
      console.log('error posting to the database', error);
    });
  }

  onSecretClick() {
    this.setState({ secretKeyVisible: !this.state.secretKeyVisible });
  }

  onPermissionsClick(e) {
    const that = this;
    const permissions = that.state.permissions;
    const permission = e.target.name;
    permissions[permission] = (e.target.value === 'true') ? false : true;
    that.setState({ permissions });
  }

  savePermissions(e) {
    e.preventDefault();
    console.log('saved');
    const that = this;
    const data = {};
    const encoded = this.state.authKey;
    const decoded = new Buffer(encoded, 'base64').toString('utf8');
    const apiKey = decoded.split(':')[0];
    data['apiKey'] = apiKey;
    const permissions = this.state.permissions;
    data['permissions'] = permissions;
    axios({
      method: 'post',
      baseURL: path,
      url: 'permission',
      headers: { Authorization: `Bearer ${localStorage.sheepToken}` },
      data,
    }).then((response) => {
      that.setState({ permissions });
    });
  }

  render() {
    const encoded = this.state.authKey;
    const decoded = new Buffer(encoded, 'base64').toString('utf8');
    const apiKey = decoded.split(':')[0];
    const clientKey = decoded.split(':')[1];
    const profileInfo = {};
    profileInfo['Username'] = this.state.userName;
    profileInfo['Developer ID'] = this.state._id;
    profileInfo['API Key'] = apiKey;
    profileInfo['Client Key'] = clientKey;
    for (const name in this.state.database) {
      profileInfo[name] = Object.keys(this.state.database[name]);
    }
    return (
      <div>
        <NavigationBar />
        <DashNavBar toggle={this.toggleInfoDisplayed} />
        {this.state.infoDisplayed === 'dashboard' &&
          <div>
            <DBNavBar click={this.onDBClick} names={this.state.DBkeys} />
            <ColNavBar click={this.onColClick} names={this.state.Colkeys} />
            <Display
              display={this.state.activeCollectionData}
            />
            <ApiSandbox
              postClick={this.onPostClick}
              postInput={this.state.postInput}
              putClick={this.onPutClick}
              deleteClick={this.onDeleteClick}
              onChange={this.onChange}
            />
          </div>
        }
        {this.state.infoDisplayed === 'create' &&
          <div>
            <ClientInput
              onChange={this.onChange}
              onCreateClick={this.onCreateClick}
              error={this.state.createDBError}
            />
          </div>
        }
       {this.state.infoDisplayed === 'profile' &&
          <div>
            <UserProfile
              authKey={this.state.authKey}
              profileInfo={profileInfo}
              onClick={this.onSecretClick}
              secretKeyVisible={this.state.secretKeyVisible}
            />
            <Permissions
              permissions={this.state.permissions}
              onClick={this.onPermissionsClick}
              savePermissions={this.savePermissions}
            />
            <PublicAPI devId={this.state._id} authKey={this.state.authKey} />
          </div>
        }
        {this.state.infoDisplayed === 'docs' &&
          <div>
            <Docs />
          </div>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  params: React.PropTypes.string,
};

export default Dashboard;
