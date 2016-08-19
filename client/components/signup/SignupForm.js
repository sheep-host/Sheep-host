import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';


//axios = library for making post requests

//is route component for this route
class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:'',
			//passwordConfirmation:''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}
	//here, 'this' would refer to event context - bind in constructor (or where passed down through props)
	//e.target.name refering to input action 
	onChange(e) {
		this.setState({[e.target.name] : e.target.value })
	}  


	onSubmit(e) {
		e.preventDefault();
		console.log('THIS.STATE ON SUBMIT', this.state);
		var _this = this.state
		
		axios.post('/signup', _this ).then(function(response) {
			
			console.log('response.data yo',response.data)

			if(response.data) { 
				console.log('IF STATEMENT SIGNUP POST')
				browserHistory.push('dashboard/' + _this.username)
			} 



			}).catch(function(error) {
			console.log('ERROR ON PROMISE SIGNUP FORM', error)
		})
		// this.props.userSignupRequest(this.state).then(function() {
		// 	console.log('inside submit')
		// 	browserHistory.push('dashboard')
		// })
	}

	//refactor and move 'form-group' to new file - DRY
	render() {
		return (
			
			<form onSubmit={this.onSubmit}>
				<h1> Create Account </h1>

				<div className="form-group">
					<label className="control-label"> Username</label>
					<input
						value={this.state.username}
						onChange={this.onChange}
						type="text"
						name="username"
						className="form-control"
					/>
					</div>

				<div className="form-group">
					<label className="control-label">Password</label>
					<input
						onChange={this.onChange}
						value={this.state.password}
						
						type="password"
						name="password"
						className="form-control"
					/>
					</div>

				

					<div className="form-group">
						<button className="btn btn-primary btn-lg">Sign Up
						</button>
					</div>
				
			</form>
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