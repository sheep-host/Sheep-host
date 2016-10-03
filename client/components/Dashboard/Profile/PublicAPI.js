import React from 'react';
import Clipboard from 'react-clipboard.js';

const PublicAPI = (props) => {
  return (
    <div>
      <div className="display jumbotron">
        <h2 className="api-sandbox-words font">SDK Script Tags</h2>
        <h4 className="user-profile">Copy the following script tag into your html file to use SDK methods:</h4>
        <ul className="list-group">
          <pre className="code">
            <code className="SDK">
              &lt;script src="https://unpkg.com/axios/dist/axios.min.js"&gt;&lt;/script&gt;{'\n'}
              &lt;script src="https://sheep.host/public_api"&gt;&lt;/script&gt;{'\n'}
              &lt;script&gt;{'\n'}
                  {'  '}// Initialize Sheep.host{'\n'}
                  {'  '}var config = &#123;{'\n'}
                      {'    '}id: {'\''}{props.devId}{'\''},{'\n'}
                      {'    '}authKey: {'\''}{'Basic: '}{props.authKey}{'\''},{'\n'}
                      {'    '}url: "https://sheep.host/api/"{'\n'}
                  {'  '}&#125;{'\n'}
                  {'  '}sheep.dontSleep(config);{'\n'}
              &lt;/script&gt;{'\n'}
            </code>
          </pre>
        </ul>
        <Clipboard component="button" className=" btn btn-default btn-lg" button-href="#" data-clipboard-target="#code">
          Copy script tag
        </Clipboard>
      </div>
    </div>
  );
};

PublicAPI.propTypes = {
  authKey: React.PropTypes.string,
  devId: React.PropTypes.string,
};

export default PublicAPI;
