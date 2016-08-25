import React from 'react';		

const SignupInput = React.createClass({

	render() {
		return (
		<div>
			<form onSubmit={this.props.onSubmit}>
				<h1> Create Account </h1>

				<div className="form-group">
					<label className="control-label"> Username</label>
					<input
						onChange={this.props.onChange}
						type="text"
						name="userName"
						className="form-control"
					/>
					</div>

				<div className="form-group">
					<label className="control-label">Password</label>
					<input
						onChange={this.props.onChange}
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
		</div>
		)
}
})

export default SignupInput;