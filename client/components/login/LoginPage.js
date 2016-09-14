import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/loginAction';
import NavigationBar from '../NavigationBar';
import LoginForm from './LoginForm';

//is route component for this route
class LoginPage extends React.Component {
	render() {
	const { userLogin } = this.props
		return (
			<div>
			<NavigationBar />
				<div className="h jumbotron">
					<div className="col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
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