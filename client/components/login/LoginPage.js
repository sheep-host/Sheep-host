import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/loginAction';
import  Dashboard  from '../Dashboard';
import NavigationBar from '../NavigationBar';
//is route component for this route


class LoginPage extends React.Component {
	render() {
	const { userLogin } = this.props
		return (
			<div>
			<NavigationBar />
				<div className="row">
					<div className="col-md-4 col-md-offset-4">
					<LoginForm 
						userLogin={userLogin} 
					/>
					</div>
				</div>
			</div>
		)
	}
}

LoginPage.propTypes = {
	userLogin: React.PropTypes.func.isRequired
}


//short cut version
// export default connect((state) => { return {} }, {userSignupRequest }) (SignupPage);
export default connect(null, {userLogin }) (LoginPage);