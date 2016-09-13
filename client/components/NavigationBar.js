import React from 'react';
import { Link } from 'react-router';
import auth from '../Auth';
import logo from '../../Public/sheepHostSheep.png';

export default () => {
  let loginButton;
  let signupButton
  if (auth.loggedIn()){
    loginButton = <li><Link to="/logout" activeClassName="active"><span className="header-action-words">Logout</span></Link></li>;
  }
  else{
    loginButton = <li ><Link to="/login" activeClassName="active"> <span className="header-action-words">Login</span></Link></li>
    signupButton = <li><Link to="/signup" activeClassName="active"><span className="header-action-words">Signup</span></Link></li>;
  }
	return (
    <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand"><img src={ logo } className="logo"/></Link>
        </div>
        <div className="collapse navbar-collapse header-action-words">
          <ul className="nav navbar-nav navbar-right header-action-words">
            {loginButton}            
            {signupButton}
          </ul>
        </div>
    </nav>
	)
}