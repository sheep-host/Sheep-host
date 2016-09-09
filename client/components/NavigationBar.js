import React from 'react';
import { Link } from 'react-router';
import auth from '../Auth';




export default () => {
  let loginButton;
  let signupButton
  if (auth.loggedIn()){
    loginButton = <li><Link to="/logout" activeClassName="active"><span className="header-action-words"><b>Logout</b></span></Link></li>;
  }
  else{
    loginButton = <li ><Link to="/login" activeClassName="active"> <span className="header-action-words"><b>Login</b></span></Link></li>
    signupButton = <li><Link to="/signup" activeClassName="active"><span className="header-action-words"><b>Signup</b></span></Link></li>;
  }
	return (

	<nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand"><span className="sheep-host">Sheep.host</span></Link>
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