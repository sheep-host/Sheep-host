//for route MUST specify path and path component for when user goes to this path
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginPage from './components/login/LoginPage'
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import Dashboard from './components/Dashboard';
import LogoutComponent from './components/logout/Logout';
// import NotFound from './components/PageNotFound';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Greetings} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="logout" component={LogoutComponent} />
		<Route path="dashboard/:username" component={Dashboard} />
	</Route>
)