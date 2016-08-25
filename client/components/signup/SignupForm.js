import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import{ userSignupRequest } from '../../actions/signupActions'
import  SignupInput  from './SignupInput'



//is root component for this route
class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName:'',
			password:'',
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
			if(response.data) { 
				console.log('IF STATEMENT SIGNUP POST')
				browserHistory.push('dashboard/' + _this.userName)
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