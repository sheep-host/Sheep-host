import React from 'react';

const LoginInput = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <h1 className="login-signup-words"> Login </h1>
        <div className="form-group">
          <label className="control-label"> Username</label>
          {props.error.userName &&
            <div className="error">{props.error.userName}</div>
          }
          <input
            onChange={props.onChange}
            type="text"
            name="userName"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          {props.error.password &&
            <div className="error">{props.error.password}</div>
          }
          <input
            onChange={props.onChange}
            type="password"
            name="password"
            className="form-control"
          />
          <div className="form-group">
            <button className="login-button btn btn-default btn-lg">Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

LoginInput.propTypes = {
  error: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

export default LoginInput;
