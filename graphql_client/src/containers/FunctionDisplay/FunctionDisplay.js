import React, {Component} from 'react';
import './FunctionDisplay.css'
import FunctionDescription from '../../components/FunctionDescription/FunctionDescription'
import PythonSnippet from '../../components/PythonSnippet/PythonSnippet'
import Active from '../../hoc/Active'
import EditOrDisplay from '../../hoc/EditOrDisplay'



class FunctionDisplay extends Component {
  state = {
    name: this.props.detail.name,
    description:this.props.detail.description,
    codeExample:this.props.detail.codeExample,
    initialDescription:this.props.detail.description,
    initialSnippet:this.props.detail.codeExample,
    showEditButton:false,
  }

  // built in life cycle method
  static getDerivedStateFromProps(props, state){
    // Ensures that the new props we recieve update the state
    let {name, description, codeExample} = props.detail
    if(name !== state.name){
      return {
        name:name,
        description:description,
        codeExample:codeExample,
        initialDescription:description,
        initialSnippet:codeExample
      }
    }else{
      return null
    }
  }

  showButton = () => {
    if(!this.props.editing && !this.state.showEditButton){
      this.setState({showEditButton:true})
    }
  }

  hideButton = () => {this.setState({showEditButton:false})}

  updateDescription = (value) => {
    this.setState({description:value})
  }

  updateSnippet = (value) => {
    this.setState({codeExample:value})
  }

  cancel = () => {
    let description = this.state.initialDescription
    let snippet = this.state.initialSnippet
    //reset the internal state of this component
    this.setState({description:description, codeExample:snippet})
    // call parent cancel, which swithces isEditing to false
    this.props.cancel()
  }

  // the idea is to define an inner save method that calls the parent save in its body
  save = () =>{
    let {name, description, codeExample} = this.state
    //update the initial values of the state
    this.setState({
      initialDescription: description,
      initialSnippet: codeExample,
    })

    // call the parent save function to perform the mutation
    this.props.save(name, description, codeExample)
  }

  render (){
    let {click, editing } = this.props
    return (
      <div
        onMouseEnter={this.showButton}
        onMouseLeave={this.hideButton}>
        <div className={'Display'}>

          <Active active={this.state.showEditButton}>
            <button className={'btn-edit'} onClick={click}>
              Edit
            </button>
          </Active>

          <EditOrDisplay
              title={'Description'}
              editing={editing}
              update={this.updateDescription}
              text={this.state.description}>
            <FunctionDescription name={this.state.name} text={this.state.description}/>
          </EditOrDisplay>

          <EditOrDisplay title={'Code Snippet'}
            editing={editing}
            update={this.updateSnippet}
            text={this.state.codeExample}>
            <PythonSnippet text={this.state.codeExample}/>
          </EditOrDisplay>


        </div>

        <Active active={this.props.editing}>
          <button onClick={this.save}> Save </button>
          <button onClick={this.cancel}> Cancel </button>
        </Active>

      </div>
    )
  }
}

export default FunctionDisplay
