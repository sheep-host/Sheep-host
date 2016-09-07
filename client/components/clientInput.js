import React from 'react';


const ClientInput = React.createClass({

	

	render() {
		return (
		<div className="jumbotron well well-lg">
		<form>
				<div className="form-group">
					
					<div className="input-group input-group-md">
						<label for="dbName">Database Name</label>
						<br></br>
							<small id="databaseHelp" className="form-text text-muted">If you would like to create a new database, enter a new database name. Otherwise, enter the name of an existing database you would like to add a collection to</small>
								<input 
									className="form-control"
									onChange={this.props.onChange}
									placeholder="Database Name"
									type="text"
									name="dbName">
								</input>
					</div>
					
					<p></p>
				<div className="input-group input-group-md">
					<label for="collectionName">Collection Name</label>
					<br></br>
					<small id="collectionHelp" className="form-text text-muted">Enter name of collection you are creating</small>
						<input 
							className="form-control"
							onChange={this.props.onChange}
							placeholder="Collection Name"
							type="text"
							name="collectionName">
						</input>
				</div>
				<p></p>
				<div className="form-group form-control-md">
					<label for="collectionName">Schema</label>
					<br></br>
					<small id="databaseHelp" className="form-text text-muted">Use JSON format and please highlight the type</small>
						<textarea 
							rows="5"
							className="form-control form-control-md"
							onChange={this.props.onChange}
							placeholder="Schema"
							type="text"
							name="schema">
						</textarea>
				</div>
				<div>
					<button
						className="btn btn-primary btn-lg"
						onClick={this.props.onCreateClick}>
							ADD
					</button>
				</div>
			</div>
		</form>
	</div>
	)

	}
})


export default ClientInput;
