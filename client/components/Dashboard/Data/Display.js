import React from 'react';
import DataItem from './DataItem';

const Display = (props) => {
  const dataArray = [];
  props.display.forEach((el, i) =>
		dataArray.push(<DataItem className="list-item" key={i} keys={i} info={el} />)
	);
  return (
    <div className="display jumbotron">
      <ul className="list-group" style={{marginTop:'170px'}}>
        {dataArray}
      </ul>
    </div>
	);
};


export default Display;
