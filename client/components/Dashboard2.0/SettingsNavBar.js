import React from 'react';


const SettingsNavBar = React.createClass({
	getInitialState() {
	    return {
	          selected: 'dbname'
	    };
	},
	onClick() {
		console.log('clicked')
	},

	render() {
		return (
							<div className="btn-group btn-group-justified" role="group" aria-label="...">
							  <div className="btn-group" role="group">
							    <button type="button" className="btn btn-default">Dashboard</button>
							  </div>
							  <div className="btn-group" role="group">
							    <button type="button" onClick={this.onClick}className="btn btn-default">Create</button>
							  </div>
							  <div className="btn-group" role="group">
							    <button type="button" className="btn btn-default">Profile</button>
							  </div>
							    <div className="btn-group" role="group">
							    <button type="button" className="btn btn-default">Docs</button>
							  </div>
							</div>
		)
	}
})

export default SettingsNavBar;