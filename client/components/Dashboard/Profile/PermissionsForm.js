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
		console.log(props.permissions['GET'], radioArray);
		return(
			<div>
				<h2>Set Client Permissions</h2>
					<div className="user-profile well well-lg">
						<table>
						{radioArray.map(function(permission, i){
							return(
								<tbody key={i+4}>
								<tr key={i+5}>
									<td key={i+6}><strong>{Object.keys(permission)[0]}:</strong></td>
									<td key={2*i-1}><input
										key={2*i-1}
										type="radio"
										value={props.permissions[Object.keys(permission)[0]]}
										onChange={props.onClick}
										checked={props.permissions[Object.keys(permission)[0]] === true}
										name={Object.keys(permission)[0]}
									/>True</td>
									<td key={2*i}><input
									  key={2*i}
										type="radio"
										value={props.permissions[Object.keys(permission)[0]]} 
										onChange={props.onClick}
										checked={props.permissions[Object.keys(permission)[0]] === false}
										name={Object.keys(permission)[0]}
									/>False</td> 
								</tr>
								</tbody>
							)
						})}
						</table>
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