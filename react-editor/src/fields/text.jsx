import React from 'react'
import PropTypes from 'prop-types'
import { Textarea, Text as TextInput } from 'mireco/inputs'

import Draggable from '../components/draggable.jsx'

function Text(props) {
  const handleLabelChange = (newLabel) => {
    props.onChange(props.fieldKey, {
      label: newLabel,
    })
  }
  const handlePlaceholderChange = (newPlaceholder) => {
    props.onChange(props.fieldKey, {
      placeholder: newPlaceholder,
    })
  }
  const handleDelete = () => {
    props.onChange(props.fieldKey, null)
  }
  return (
    <>
      <Draggable
        identifier={{
          type: 'field',
          field: props.fieldKey,
        }}
        onDelete={handleDelete}
        onDropNew={props.context.onDropNew}
        onDropExisting={props.context.onDropExisting}
      >
        <Textarea
          className="paragraph"
          minRows={1}
          placeholder="Type label here"
          block
          value={props.label}
          onChange={handleLabelChange}
        />
        <TextInput
          block
          value={props.placeholder || ''}
          placeholder="Text"
          onChange={handlePlaceholderChange}
        />
      </Draggable>
    </>
  )
}
Text.propTypes = {
  fieldKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
}

export default Text
