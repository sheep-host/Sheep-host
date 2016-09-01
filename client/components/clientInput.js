import React from 'react';


// const buttons = React.createClass({
// 	getInitialState() {
// 	    return {
// 	        buttonSelected: null  
// 	    };
// 	},
// 	render() {
// 		return (
// 			<div>
// 				<button type="button" class="btn btn-primary btn-lg">Create Database</button>
// 				<button type="button" class="btn btn-primary btn-lg">Create Collection</button>
// 			</div>
// 		)	
// 	}
// })


const ClientInput = React.createClass({

	

	render() {
		return (
		<div className="jumbotron">
		<form>
				<div className="form-group">
					
					<div className="input-group input-group-md">
						<label for="dbName">Database Name</label>
						<br></br>
							<small id="databaseHelp" className="form-text text-muted">Enter Name of Database you would like to add to</small>
								<input 
									className="form-control"
									onChange={this.props.onDbNameChange}
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
							onChange={this.props.onCollectionNameChange}
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
							onChange={this.props.onSchemaChange}
							placeholder="Schema"
							type="text"
							name="schema">
						</textarea>
				</div>
				<div>
					<button
						className="btn btn-primary btn-lg"
						onClick={this.onClick}>
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
