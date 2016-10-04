import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userLogin from '../../actions/loginAction';
import NavigationBar from '../NavigationBar';
import LoginForm from './LoginForm';

// is route component for this route
const LoginPage = (props) => {
  console.log('login props', props);
  return (
    <div>
      <NavigationBar />
      <div className="h jumbotron">
        <div className="col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
          <LoginForm
            userLogin={props.actions.userLogin}
          />
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ userLogin }, dispatch),
  };
}

// short cut version
// export default connect((state) => { return {} }, {userSignupRequest }) (SignupPage);
export default connect(null, mapDispatchToProps)(LoginPage);
