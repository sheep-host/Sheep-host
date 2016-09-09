import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import{ userLogin } from '../../actions/loginAction'
import LoginInput from './LoginInput';
import auth from '../../Auth'
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';
import ValidateInputForm from './LoginFormValidation';

//is route component for this route
//ValidateInputForm not setting state properly, use alert for now
//using setTimeout for alert due to interferance of microtask
class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			errors: {}
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value })
	}

	isValid() {
		var that = this
		console.log('isvalid')
		const {errors, isValid } = ValidateInputForm(this.state)
		let errorArray = []
		if(!isValid) {
			for(var value in errors) {
				errorArray.push(errors[value] + " ")
			}
			alert(errorArray)
		}
		return isValid
	}
	
	onSubmit(e) {
		e.preventDefault();
		if(this.isValid()) {
			console.log('LoginForm on submit', this.state)
			var _this = this.state
			this.props.userLogin(_this).then(function(response) {
			console.log('login form on submit response', response)
			if(response.data){
				browserHistory.push('dashboard/' + _this.userName)
			}
		}).catch(function(error) {
			return setTimeout(function() {
				console.log(error)
				alert(error.data)
			}, 0)
		})
		} 
	}

	componentDidMount(){
		if(auth.loggedIn()){
			let sheepToken = jwtDecode(localStorage.sheepToken);
			browserHistory.push('dashboard/' + sheepToken.userName);
		}
	}

	render() {
		return (
			<div className="login-input-outer">
				<LoginInput onSubmit={this.onSubmit}
									  onChange={this.onChange} 
									  userName={this.state.userName}
									  error={this.state.errors}
									  password={this.state.password} />			
			</div>
		)
	}
}

LoginForm.propTypes = {
	userLogin: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}


export default LoginForm;
