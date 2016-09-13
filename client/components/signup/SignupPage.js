import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import NavigationBar from '../NavigationBar';
import SignupForm from './SignupForm';

//is route component for this route

//this renders signupform - which is where they login, confirming they're account and rendering to DB
class SignupPage extends React.Component {
	render() {
		const { userSignupRequest } = this.props

		return (
			<div>
			<NavigationBar />
			<div className="h jumbotron">
				<div className="col-md-4 col-md-offset-4">

					<SignupForm 
						userSignupRequest={userSignupRequest} 
					/>
				</div>
			</div>
			</div>	
		)
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}


//short cut version
// export default connect((state) => { return {} }, {userSignupRequest }) (SignupPage);


export default connect(null, {userSignupRequest }) (SignupPage);