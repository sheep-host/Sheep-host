import React from 'react';
import { browserHistory } from 'react-router';
import SignupInput from './SignupInput';
import validateSignupInputForm from './SignupFormValidation';

// is root component for this route
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      email: '',
      error: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const that = this;
      this.props.userSignupRequest(that.state).then((response) => {
        if (response.data) {
          browserHistory.push('wait/');
        }
      }).catch((error) => {
        that.setState({ error: { userName: error.data.error } });
      });
    }
  }

  isValid() {
    const that = this;
    const { errors, isValid } = validateSignupInputForm(this.state);
    if (!isValid) {
      that.setState({ error: errors });
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="login-input-outer">
        <SignupInput
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          userName={this.state.userName}
          email={this.state.email}
          password={this.state.password}
          error={this.state.error}
        />
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default SignupForm;
