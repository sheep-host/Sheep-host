import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import  Dashboard  from '../Dashboard';
//is route component for this route

//this renders signupform - which is where they login, confirming they're account and rendering to DB
class SignupPage extends React.Component {
	render() {

		const { userSignupRequest } = this.props

		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">

					<SignupForm 
						userSignupRequest={userSignupRequest} 
					/>
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

//not using redux right now, using axios.post inside of onsubmit function in signupform component
export default connect(null, {userSignupRequest }) (SignupPage);