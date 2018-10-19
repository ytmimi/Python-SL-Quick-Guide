import React, { Component } from 'react';
import './App.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";


import FunctionGrid from './containers/FunctionGrid/FunctionGrid'
import FunctionDisplay from './containers/FunctionDisplay/FunctionDisplay'

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
});

class App extends Component {
  state = {
    functions :[],
    active:''
  }

  query = gql`
    {
      functions{
        name
        description
        codeExample
      }
    }
  `
  componentDidMount (){
    client.query(
      {query:this.query}
    )
    .then( result => this.setState({functions:result.data.functions}))
  }

  cellClickHandler = (name)  => {
    this.setState({active:name})
  }

  getFunctionByName = (name) =>{
    const functions = [...this.state.functions]
    let index = functions.findIndex(func => func.name === name)
    return functions[index]
  }

  render() {
    let name = this.state.active
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>Python Standard Library Functions</h2>
          <FunctionGrid functions={this.state.functions} click={this.cellClickHandler}/>
          {this.state.active !== '' ? <FunctionDisplay detail={
            this.getFunctionByName(name)}/> : null}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
