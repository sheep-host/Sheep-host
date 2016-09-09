import React from 'react';
import axios from 'axios';

const ApiSandbox = React.createClass({

	render(){
		return(
			<div className="display jumbotron">
				<h2 className="api-sandbox-words">Your API Sandbox</h2>
				<div>Make CRUD requests to this collection to test out your data</div>
				<br></br>
				<form>
				<div className="form-group">	
					<div className="input-group input-group-md">
						<label for="dbName">POST</label><br></br>
						<small id="postHelp" className="form-text text-muted">Add a document to this collection </small>
						<input 
							className="form-control"
							placeholder="Enter {<key>: <value>} of new document"
							type="text"
							name="postInput"
							onChange={this.props.onChange}>
						</input>
						<button
							className="btn btn-primary btn-lg"
							onClick={this.props.postClick}>
								POST
						</button>
					</div>
				</div>
				</form>
				<form>
				<div className="form-group">	
					<div className="input-group input-group-md">
						<label for="dbName">PUT</label><br></br>
						<small id="putHelp" className="form-text text-muted">Update a document in this collection </small>
							<input 
								className="form-control"
								placeholder="Enter {<key>: <value>} from one field of document to change"
								type="text"
								name="putQuery"
								onChange={this.props.onChange}>
							</input>
							<input 
								className="form-control"
								placeholder="Enter {<key(s)>: <value(s)>} to change"
								type="text"
								name="putInput"
								onChange={this.props.onChange}>
							</input>
							<button
								className="btn btn-primary btn-lg"
								onClick={this.props.putClick}>
									PUT
							</button>
						</div>
					</div>
				</form>
				<form>
					<div className="form-group">	
						<div className="input-group input-group-md">
						<label for="dbName">DELETE</label><br></br>
							<small id="deleteHelp" className="form-text text-muted">Delete a record from this collection </small>
							<input 
								className="form-control"
								placeholder="Enter {<key>: <value>} from one field of document to delete"
								type="text"
								name="deleteQuery"
								onChange={this.props.onChange}>
							</input>
							<button
								className="btn btn-primary btn-lg"
								onClick={this.props.deleteClick}>
									DELETE
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
})

export default ApiSandbox;