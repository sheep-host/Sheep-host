import React from 'react';
import { Link } from 'react-router';




export default () => {
  let loginButton;
  let signupButton
  if (localStorage.sheepToken){
    loginButton = <li><Link to="/logout" activeClassName="active"> Log out</Link></li>;
  }
  else{
    loginButton = <li><Link to="/login" activeClassName="active"> Log In </Link></li>
    signupButton = <li><Link to="/signup" activeClassName="active">Sign up </Link></li>;
  }
	return (

	<nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Sheep.host</Link>
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