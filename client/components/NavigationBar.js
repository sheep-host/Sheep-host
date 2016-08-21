import React from 'react';
import { Link } from 'react-router';




export default () => {
	return (

	<nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Sheep</Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login" activeClassName="active"> Login </Link></li>
            <li><Link to="/signup" activeClassName="active">Sign up </Link></li>
            </ul>
          </div>
        </div>
     </nav>



		)
}