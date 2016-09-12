import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginPage from './components/login/LoginPage'
import App from './components/app';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import WaitPage from './components/WaitPage';
import Dashboard from './components/Dashboard/Dashboard';
import LogoutComponent from './components/logout/Logout';
// import NotFound from './components/PageNotFound';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Greetings} />
		<Route path="signup" component={SignupPage} />
    <Route path="wait" component={WaitPage} />
		<Route path="login" component={LoginPage} />
		<Route path="logout" component={LogoutComponent} />	
		<Route path="dashboard/:username" component={Dashboard} />
	</Route>
)

