import React from 'react';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import auth from '../../Auth';
import LoginInput from './LoginInput';
import validateLoginInput from './LoginFormValidation';

// is route component for this route
// ValidateInputForm not setting state properly, use alert for now
// using setTimeout for alert due to interferance of microtask
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      error: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const that = this;
    const { errors, isValid } = validateLoginInput(this.state);
    if (!isValid) {
      that.setState({ error: errors });
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const that = this;
      this.props.userLogin(that.state).then((response) => {
        if (response.data) {
          browserHistory.push(`dashboard/${that.state.userName}`);
        }
      }).catch((error) => {
        console.log('submit error', error);
        that.setState({ error: [error.data.error] });
      });
    }
  }

  componentDidMount() {
    if (auth.loggedIn()) {
      const sheepToken = jwtDecode(localStorage.sheepToken);
      browserHistory.push(`dashboard/${sheepToken.userName}`);
    }
  }

  render() {
    return (
      <div className="login-input-outer">
        <LoginInput
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          userName={this.state.userName}
          error={this.state.errors}
          password={this.state.password}
          error={this.state.error}
        />
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLogin: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default LoginForm;
