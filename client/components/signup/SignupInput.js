import React from 'react';

const SignupInput =(props) =>{
	return (
		<div className="font">
			<form onSubmit={props.onSubmit}>
				<h1 className="login-signup-words"> Create Account </h1>
				  <div className="form-group">
					<label className="control-label login-signup-words"> Username</label>
					<input
						onChange={props.onChange}
						type="text"
						name="userName"
						className="form-control"
					/>
					</div>

          <div className="form-group">
					<label className="control-label login-signup-words"> E-mail</label>
					<input
						onChange={props.onChange}
						type="text"
						name="email"
						className="form-control"
					/>
					</div>

				  <div className="form-group">
					<label className="control-label login-signup-words">Password</label>
					<input
						onChange={props.onChange}
						type="password"
						name="password"
						className="form-control"
					/>
					</div>

					<div className="form-group">
						<button className="btn btn-secondary btn-lg">Sign Up
						</button>
					</div>
			</form>
		</div>
		)
	}

export default SignupInput;

