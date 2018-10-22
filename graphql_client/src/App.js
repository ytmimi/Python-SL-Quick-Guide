import React, { Component } from 'react';
import './App.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";


import FunctionGrid from './containers/FunctionGrid/FunctionGrid'
import FunctionDisplay from './containers/FunctionDisplay/FunctionDisplay'
import Active from './hoc/Active'

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
});


const functionQuery = gql`
  {
    functions{
      name
      description
      codeExample
    }
  }
`

const functionMutation = gql`
mutation ($name: String!, $desc: String, $example: String) {
  updateFunction(name: $name, description: $desc, codeExample: $example) {
    name
    description
    codeExample
  }
}
`

class App extends Component {
  state = {
    functions :[],
    active:'',
    isEditing:false,
  }

  cellClickHandler = (name)  => {
    !this.state.isEditing ?
    this.setState({active:name}) : alert('Finish Editing')
  }

  getFunctionIndex = (name) => (
    // find the finction index by name
    this.state.functions.findIndex(func => func.name === name)
  )

  getFunctionByName = (name) =>{
    if(name !== ''){
      let functions = [...this.state.functions]
      let index = this.getFunctionIndex(name)
      return functions[index]
    }
  }

  //Set the Application in editing mode
  toggleEditing = () => {
    this.state.isEditing ?
    this.setState({isEditing:false}) : this.setState({isEditing:true})
  }

  // runs the functionMutation to save data to the db
  mutate = (mutation, vars, funcList, index) => {
    client.mutate({ mutation:functionMutation, variables:vars})
    .then( result => {
      //checks for errors
      if(result.error){
        alert(result.error)
      //if no errors update the function list
      }else{
        //update the correct index
        funcList[index] = result.data.updateFunction
        //set the new state and set isEditing to false
        this.setState({functions:funcList, isEditing:false})
      }
    })
  }

  save = (funcName, funcDescription, codeSnippet) => {
    //check if there are any differences and if there are perform a mutation
    let functions = [...this.state.functions]
    let index = this.getFunctionIndex(funcName)
    let {name, description, codeExample} = functions[index]
    if (funcName!==name
      || funcDescription!==description
      || codeSnippet!==codeExample){
      //formats the variables
      let variables = {
        name:funcName,
        desc:funcDescription,
        example:codeSnippet
      }
      this.mutate(functionMutation, variables, functions, index)
    }
  }

  cancel = () => {
    // just sets editing back to false
    this.setState({isEditing:false})
  }

  componentDidMount() {
    client.query({query:functionQuery})
    .then( result => this.setState({functions:result.data.functions}))
    console.log(client);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>Python Standard Library Functions</h2>
          <FunctionGrid functions={this.state.functions} click={this.cellClickHandler}/>
            <Active active={this.state.active}>
              <FunctionDisplay
                detail={this.getFunctionByName(this.state.active)}
                editing={this.state.isEditing}
                click={this.toggleEditing}
                save={this.save}
                cancel={this.cancel}
                />
            </Active>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
