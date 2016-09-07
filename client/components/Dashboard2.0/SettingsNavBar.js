import React from 'react';


const SettingsNavBar = React.createClass({
	getInitialState() {
	    return {
	          selected: 'dbname'
	    };
	},


	render() {

		return (
			<div className="btn-group btn-group-justified" role="group" aria-label="...">
			  <div className="btn-group" role="group">
			    <button name="dashboard" type="button" onClick={this.props.toggle} className="btn btn-default">Data</button>
			  </div>
			  <div className="btn-group" role="group">
			    <button name="create" type="button" onClick={this.props.toggle} className="btn btn-default">Create</button>
			  </div>
			  <div className="btn-group" role="group">
			    <button name="profile" type="button" onClick={this.props.toggle} className="btn btn-default">Profile</button>
			  </div>
			    <div className="btn-group" role="group">
			    <button name="docs" type="button" onClick={this.props.toggle} className="btn btn-default">Docs</button>
			  </div>
			</div>
		)
	}
})

export default SettingsNavBar;