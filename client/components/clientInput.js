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
		<form onSubmit={this.props.onSubmit}>
				<div className="Client-Input">
					
					<div className="input-group input-group-sm">
						<input 
							className="form-control"
							onChange={this.props.onDbNameChange}
							placeholder="Database Name"
							type="text"
							name="dbName">

						</input>
					</div>
				<div className="input-group input-group-sm">
					<input 
						className="form-control"
						onChange={this.props.onCollectionNameChange}
						placeholder="collection Name"
						type="text"
						name="collectionName">

					</input>
					</div>
				<div>
					<textarea 
						onChange={this.props.onSchemaChange}
						placeholder="Schema"
						type="text"
						name="schema">
					</textarea>

				
				<button
					className="btn btn-primary"
					onClick={this.onClick}>
					Create MongoDB
				</button>
				
				</div>
			</div>
			</form>
		</div>
		)

	}
})


export default ClientInput;
