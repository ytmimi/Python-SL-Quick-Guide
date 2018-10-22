import React from 'react';
import Editer from '../components/Editer/Editer'


const EditOrDisplay = ({title, editing, update, text, children}) => (
  editing ?
    <Editer title={title} update={update} text={text} /> : children
)

export default EditOrDisplay
