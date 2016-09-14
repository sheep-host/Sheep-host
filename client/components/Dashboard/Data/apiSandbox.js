import React from 'react';
import axios from 'axios';


const ApiSandbox = (props) => {
	return(
		<div className="display jumbotron">
			<h2 className="api-sandbox-words font">Your API Sandbox</h2>
			<div className="user-profile">Make CRUD requests to this collection to test out your data</div>
			<br></br>
			<form>
			<div className="form-group">	
				<div className="input-group input-group-lg col-lg-6">
					<label className="post-put-delete font">POST</label><br></br>
					<small id="postHelp" className="form-text text-muted">Add a document to this collection </small>
					<input 
						className="form-control"
						placeholder="Enter {<key>: <value>} of new document"
						type="text"
						name="postInput"
						onChange={props.onChange}>
					</input>
				</div>
					<button
						className="api-button btn btn-default btn-lg"
						onClick={props.postClick}>
						POST
				</button>
			</div>
			</form>
			<form>
			<div className="form-group">	
				<div className="input-group input-group-lg col-lg-6">
					<label className="post-put-delete font">PUT</label><br></br>
					<small id="putHelp" className="form-text text-muted">Update a document in this collection </small>
						<input 
							className="put-input form-control"
							placeholder="Enter {<key>: <value>} from one field of document to change"
							type="text"
							name="putQuery"
							onChange={props.onChange}>
						</input>
						<input 
							className="put-input form-control"
							placeholder="Enter {<key(s)>: <value(s)>} to change"
							type="text"
							name="putInput"
							onChange={props.onChange}>
						</input>
					</div>
						<button
							className="api-button btn btn-default btn-lg"
							onClick={props.putClick}>
								PUT
						</button>
				</div>
			</form>
			<form>
				<div className="form-group">	
					<div className="input-group input-group-lg col-lg-6">
					<label className="post-put-delete font">DELETE</label><br></br>
						<small id="deleteHelp" className="form-text text-muted">Delete a record from this collection </small>
						<input 
							className="form-control"
							placeholder="Enter {<key>: <value>} from one field of document to delete"
							type="text"
							name="deleteQuery"
							onChange={props.onChange}>
						</input>
					</div>
						<button
							className="api-button btn btn-default btn-lg"
							onClick={props.deleteClick}>
								DELETE
					</button>
				</div>
			</form>
		</div>
	)
}


export default ApiSandbox;