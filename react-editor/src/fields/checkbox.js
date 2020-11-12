import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox as CheckboxInput, Textarea } from 'mireco'

import { Draggable } from 'components'

function Checkbox(props) {
  const handleLabelChange = (newLabel) => {
    props.onChange(props.fieldKey, {
      label: newLabel,
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
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <CheckboxInput onChange={() => {}} />
          <Textarea
            className="paragraph"
            style={{flex: '1', margin: 0, marginLeft: '0.5rem'}}
            minRows={1}
            placeholder="Type label here"
            block
            value={props.label}
            onChange={handleLabelChange}
          />
        </div>
      </Draggable>
    </>
  )
}
Checkbox.propTypes = {
  fieldKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
}

export default Checkbox
