import React, {Component} from 'react';
import FunctionCell from '../../components/FunctionCell/FunctionCell'
import './FunctionGrid.css'



class FunctionGrid extends Component{
  mapFunctionCell = () => {
    return this.props.functions.map(({ name }, index) => (
      <FunctionCell key={name} name={name} click={this.props.click}/>
    ));
  }

  render () {
    return (
      // calls a child function with loading, error, and data
      <div className={'Grid'}>
        {this.mapFunctionCell()}
      </div>
    )
  }
}

export default FunctionGrid
