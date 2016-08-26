import React from 'react';
import { Link } from 'react-router';




export default () => {
  let loginButton;
  let signupButton
  if (localStorage.sheepToken){
    loginButton = <li><Link to="/logout" activeClassName="active"> <b>Log out</b></Link></li>;
  }
  else{
    loginButton = <li><Link to="/login" activeClassName="active"> <b>Log In </b></Link></li>
    signupButton = <li><Link to="/signup" activeClassName="active"><b>Sign up </b></Link></li>;
  }
	return (

	<nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand"><b>Sheep.host</b></Link>
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