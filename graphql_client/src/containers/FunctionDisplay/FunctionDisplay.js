import React, {Component} from 'react';
import './FunctionDisplay.css'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import FunctionDescription from '../../components/FunctionDescription/FunctionDescription'
import PythonSnippet from '../../components/PythonSnippet/PythonSnippet'


const FunctionDisplay = (props) => {
  let {name, description, codeExample} = props.detail
  console.log(props.detail)
    return (
      <div className={'Display'}>
        <FunctionDescription name={name} description={description}/>
        <PythonSnippet codeString={codeExample}/>
      </div>
    )
  }

export default FunctionDisplay
