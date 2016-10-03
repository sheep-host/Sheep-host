import React from 'react';

const App = (props) => {
  return (
    <div className="a container-fluid">
      {props.children}
      <footer><div className="footer-contact">Sheep.host is in BETA, contact us at <a href="mailto:administrator@sheep.host">administrator@sheep.host</a> with feedback!</div></footer>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
