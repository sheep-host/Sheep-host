import React from 'react';

// this refactoring needs to be tested before merged!!!!!!!!!
// !!!!!!
const Permissions = (props) => {
  const radioArray = [];
  for (const permission in props.permissions) {
    const permissionObj = {};
    permissionObj[permission] = props.permissions[permission];
    radioArray.push(permissionObj);
  }
  return (
    <div>
      <div className="display user-profile font jumbotron">
        <h2 className="api-sandbox-words font">Set Client Permissions</h2>
          {radioArray.map((permission, i) => {
            return (
              <div key={i}><strong>{Object.keys(permission)[0]} : </strong>
                <input
                  key={i + true}
                  type="radio"
                  value={Object.keys(permission)[0]}
                  onChange={props.onClick}
                  checked={permission[Object.keys(permission)[0]] === true}
                /> True
                <input
                  key={i + false}
                  type="radio"
                  value={Object.keys(permission)[0]}
                  onChange={props.onClick}
                  checked={permission[Object.keys(permission)[0]] === false}
                /> False
              </div>
            );
          })
        };
        <br />
        <button
          className="btn btn-default btn-lg"
          onClick={props.savePermissions}
        >
          Save
        </button>
      </div>
    </div>
  );
};

Permissions.propTypes = {
  permissions: React.PropTypes.object,
  savePermissions: React.PropTypes.func,
  onClick: React.PropTypes.func,
};

export default Permissions;
