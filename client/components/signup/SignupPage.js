import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userSignupRequest from '../../actions/signupActions';
import NavigationBar from '../NavigationBar';
import SignupForm from './SignupForm';

// is route component for this route

// this renders signupform - which is where they login, confirming they're account and rendering to DB
const SignupPage = (props) => {
  return (
    <div>
      <NavigationBar />
      <div className="h jumbotron">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            userSignupRequest={props.actions.userSignupRequest}
          />
        </div>
      </div>
    </div>
  );
};

SignupPage.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ userSignupRequest }, dispatch),
  };
}

// short cut version
// export default connect((state) => { return {} }, {userSignupRequest }) (SignupPage);
export default connect(null, mapDispatchToProps)(SignupPage);
