import React from 'react';		
//Didn't copy signupInput component because we may add additional input fields to that
const LoginInput = (props) =>{
	return (
		<div>
			<form onSubmit={props.onSubmit}>
				<h1 className="login-signup-words"> Login </h1>
				<div className="form-group">
					<label className="control-label"> Username</label>
					<input
						onChange={props.onChange}
						type="text"
						name="userName"
						className="form-control"	
					/>
					</div>

				<div className="form-group">
					<label className="control-label">Password</label>
					<input
						onChange={props.onChange}
						type="password"
						name="password"
						className="form-control"
					/>
					</div>

					<div className="form-group">
						<button className="login-button btn btn-default btn-lg">Login
						</button>
					</div>
				</form>
		</div>
	)
}

export default LoginInput;