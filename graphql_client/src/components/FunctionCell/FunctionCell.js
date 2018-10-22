import React from 'react';
import './FunctionCell.css'

const FunctionCell = (props) =>{
  return (
    <div
      className={'Cell'}
      onClick={() => props.click(props.name)}>
      <p>{`${props.name}()`}</p>
    </div>
  );
}

export default FunctionCell
