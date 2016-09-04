import React from 'react'

const SideNavBar = React.createClass ({
	render() {
		return (
			<div className="col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation">
           
            <ul className="nav nav-sidebar">
              <li className="active"><a href="#">Overview</a></li>
              <li><a href="http://bootstrapzero.com" target="_ext">Themes</a></li>
              <li><a href="http://bootstrap.theme.cards" target="_ext">Analytics</a></li>
              <li>Export</li>
            </ul>
          
        </div>
	)
	}
})




export default SideNavBar;