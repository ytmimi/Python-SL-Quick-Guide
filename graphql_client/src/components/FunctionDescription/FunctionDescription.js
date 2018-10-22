import React from 'react';
import './FunctionDescription.css'

const FunctionDescription = (props) =>{
  return (
    <div>
      <div className={'metaDescription'}>
        <p>{props.name}</p>
      </div>
      <div className={'writtenDescription'}>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default FunctionDescription
