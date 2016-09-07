import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import{ userSignupRequest } from '../../actions/signupActions'
import  SignupInput  from './SignupInput';
import cookie from 'react-cookie';



//is root component for this route
class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName:'',
			password:'',
      email:''
			//passwordConfirmation:''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}
	onChange(e) {
		this.setState({[e.target.name] : e.target.value })
	}

	onSubmit(e) {
		e.preventDefault();
		console.log('THIS.STATE ON SUBMIT', this.state);
		var _this = this.state

		this.props.userSignupRequest(_this).then(function(response) {
      console.log('response in signup form: ', response);
			if(response.data) {
				localStorage.sheepToken = cookie.load('token');
				let token = jwt.decode(localStorage.sheepToken);
				let userName = token.userName;
				//browserHistory.push('wait/');
				browserHistory.push('dashboard/'+userName);
			}
			}).catch(function(error) {
			console.log('ERROR ON PROMISE SIGNUP FORM', error)
		})

	}


	render() {
		return (
			<div>
				<SignupInput onSubmit={this.onSubmit}
							 onChange={this.onChange}
							 userName={this.state.userName}
               email={this.state.email}
							 password={this.state.password} />
			</div>
			)
	}
}


SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}


export default SignupForm

