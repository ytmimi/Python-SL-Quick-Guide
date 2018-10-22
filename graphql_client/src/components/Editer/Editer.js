import React, {Component} from 'react';


const editorStyle = {
  width:'50%',
  display:'inline-block',
  marginBottom: '2%',
}


const textStyle = {
  color:'#c0c5ce',
  backgroundColor:'#2b303b',
  width:'90%',
  height:'100px',
  border:'2px solid purple',
  overflowY:'show',
}


class Editer extends Component{
  state = {
    // stack for undo
    undo:[this.props.text],
    // stack for redo
    redo:[],
    text:this.props.text,
  }

  undo = () => {
    let undoStack = [...this.state.undo]
    let redoStack = [...this.state.redo]
    console.log(undoStack, redoStack);
    if(undoStack.length > 1){
      //pop the value off the stack undoStack and push it to the redo stack
      let popped = undoStack.pop()
      redoStack.push(popped)
      //update the state
      this.setState({
        undo:undoStack,
        redo:redoStack,
        text:undoStack.slice(-1)
      })
    }
  }

  redo = () => {
    let undoStack = [...this.state.undo]
    let redoStack = [...this.state.redo]
    console.log(undoStack, redoStack);
    if(redoStack.length > 0){
      //pop the value off the redoStack and push it to the undoStack
      let popped = redoStack.pop()
      undoStack.push(popped)
      //update the state
      this.setState({undo:undoStack, redo:redoStack, text:popped})
    }
  }

  change = (event) => {
    let value = event.target.value
    // console.log(`Current Value: ${value}`);
    // copy the undoStack and push the value onto it
    let undoStack = [...this.state.undo]
    undoStack.push(value)
    //clear the redo stack if it has a value
    if(this.state.redo.length > 0){
      this.setState({redo:[]})
    }
    //call the parent change method to keep them synced
    this.props.update(value)
    this.setState({text:value, undo:undoStack})
  }

  render(){
    // console.log(`Undo Stack: ${this.state.undo}`);
    // console.log(`Redo Stack: ${this.state.redo}`);
    // console.log(`TEXT PROP: ${this.props.children.props.text}`);
    return (
      <div style={editorStyle}>
        <p>{this.props.title}</p>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.redo}>Redo</button>
        <textarea style={textStyle} value={this.state.text}
          onChange={this.change}/>
      </div>
    )
  }
}

export default Editer
