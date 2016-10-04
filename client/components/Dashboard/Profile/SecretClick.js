import React from 'react';
import jwtDecode from 'jwt-decode';


const SecretClick = (props) => {
  const token = jwtDecode(localStorage.sheepToken);
  const secretKey = token.secretKey;
  return (
    <div className="glossaryBlock">
      <p><b className="glossaryTitle" onClick={props.onClick}>API Secret Key</b>
        <span>{
          props.secretKeyVisible
            ? <span><b>:</b> {secretKey}</span>
            : false}
        </span>
      </p>
      <p className="glossaryTitle" style={{ fontSize: 12 }}> (Click to hide/show)</p>
    </div>
  );
};

SecretClick.propTypes = {
  onClick: React.PropTypes.func,
  secretKeyVisible: React.PropTypes.bool,
};

export default SecretClick;
