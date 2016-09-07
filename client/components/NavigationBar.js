import React from 'react';
import { Link } from 'react-router';
import auth from '../Auth';




export default () => {
  let loginButton;
  let signupButton
  if (auth.loggedIn()){
    loginButton = <li><Link to="/logout" style={{color:'white'}} activeClassName="active"> <b>Log out</b></Link></li>;
  }
  else{
    loginButton = <li ><Link to="/login" style={{color:'white'}} activeClassName="active"> <b>Log In </b></Link></li>
    signupButton = <li><Link to="/signup" style={{color:'white'}} activeClassName="active"><b>Sign up </b></Link></li>;
  }
	return (

	<nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand"><span className="sheep.host login-signup-words">Sheep.host</span></Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
            {loginButton}            
            {signupButton}
            </ul>
          </div>
        </div>
     </nav>



		)
}