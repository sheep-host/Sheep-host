import React from 'react';

const DataItem = (props) => {
  const dataResults = [];
  for (const value in props.info) {
    dataResults.push(<span key={props.keys + value} className="data-key">{value.toString()}</span>, ' : ', <b key={props.keys+props.info[value]}>{props.info[value]} | </b>);
  }
  return (
    <li className="i list-group-item" >
      {dataResults}
    </li>
  );
};

DataItem.propTypes = {
  info: React.PropTypes.object,
  keys: React.PropTypes.number,
};

export default DataItem;
