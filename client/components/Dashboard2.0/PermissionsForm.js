import React from 'react';

//this refactoring needs to be tested before merged!!!!!!!!!
//!!!!!!
const Permissions = (props) => {
		let radioArray = [];
		for(let permission in props.permissions){
			let permissionObj = {};
			permissionObj[permission] = props.permissions[permission];
			radioArray.push(permissionObj);
		}
		return(
			<div>
				<h2>Set Client Permissions</h2>
					<div className="jumbotron">
						{radioArray.map(function(permission, i){
						return(
							<div>{Object.keys(permission)[0]} 
								<input
									key={2*i-1}
									type="radio"
									value={Object.keys(permission)[0]}
									onChange={props.onClick}
									checked={true === permission[Object.keys(permission)[0]]}
								/> True     
								<input
								  key={2*i}
									type="radio"
									value={Object.keys(permission)[0]} 
									onChange={props.onClick}
									checked={false === permission[Object.keys(permission)[0]]}
								/> False 
							</div>
						)
					})
			}
			<br></br>
			<button
				className="btn btn-primary btn-lg"
				onClick={props.savePermissions}
			>Save</button>
			</div>
		</div>
		)
	}


export default Permissions