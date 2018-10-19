import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './ocean.css'
import './PythonSnippet.css'

const PythonSnippet = (props) => {
  return(
  <div className={'Snippet'}>
    <SyntaxHighlighter language='python' useInlineStyles={false}>
        {props.codeString}
    </SyntaxHighlighter>
  </div>
)}

export default PythonSnippet
