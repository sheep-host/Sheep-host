import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';


//axios = library for making post requests

//is route component for this route
class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName:'',
			password:'',
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
		
		console.log('LoginForm on submit')
		var _this = this.state
		
		axios.post('/login', _this).then(function(response) {
			console.log('login form on submit response', response)
			if(response.data){
				browserHistory.push('dashboard/' + _this.userName)
			}
		}).catch(function(error) {
			console.log(error)
		})
		
		// this.props.userLogin(this.state).then(function() {
			
		// 	browserHistory.push('dashboard')
		// })
	}

	//refactor and move 'form-group' to new file - DRY
	render() {
		return (
			
			<form onSubmit={this.onSubmit}>
				<h1> Login </h1>

				<div className="form-group">
					<label className="control-label"> Username</label>
					<input
						value={this.state.userName}
						onChange={this.onChange}
						type="text"
						name="userName"
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
						<button className="btn btn-primary btn-lg">Login
						</button>
					</div>
				
			</form>
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



