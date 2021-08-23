import React from 'react'
import { Textarea } from 'mireco/inputs'
import PropTypes from 'prop-types'

import Draggable from '../components/draggable.jsx'

function Text(props) {
  const handleChange = (newText) => {
    props.context.onLayoutChange(props.layoutPath, {
      text: newText,
    })
  }
  const handleDelete = () => {
    props.context.onLayoutChange(props.layoutPath, null)
  }
  return (
    <Draggable
      identifier={{
        type: 'layout',
        path: props.layoutPath,
      }}
      onDelete={handleDelete}
      onDropNew={props.context.onDropNew}
      onDropExisting={props.context.onDropExisting}
    >
      <Textarea
        value={props.text || ''}
        onChange={handleChange}
        placeholder="Text"
        block
        className="paragraph"
      />
    </Draggable>
  )
}
Text.propTypes = {
  context: PropTypes.object.isRequired,
  layoutPath: PropTypes.string,
}

export default Text
