import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import{ userLogin } from '../../actions/loginAction'
import LoginInput from './LoginInput';
import auth from '../../Auth'
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';


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

	onChange(e) {
		this.setState({[e.target.name] : e.target.value })
	}
	
	onSubmit(e) {
		e.preventDefault();

		console.log('LoginForm on submit', this.state)
		var _this = this.state
		this.props.userLogin(_this).then(function(response) {
			console.log('login form on submit response', response)
			if(response.data){
				localStorage.sheepToken = cookie.load('token');
				browserHistory.push('dashboard/' + _this.userName)
			}
		}).catch(function(error) {
			console.log(error)
		})

	}

	componentDidMount(){
		if(auth.loggedIn()){
			let sheepToken = jwtDecode(localStorage.sheepToken);
			console.log(sheepToken);
			browserHistory.push('dashboard/' + sheepToken.userName);
		}
	}

	render() {
		return (
			<div>
				<LoginInput onSubmit={this.onSubmit}
							 onChange={this.onChange} 
							 userName={this.state.userName}
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
