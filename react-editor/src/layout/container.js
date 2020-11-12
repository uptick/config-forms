import React from 'react'
import PropTypes from 'prop-types'
import { layoutRenderers } from 'config-forms-react'
import { Text } from 'mireco'

import { Draggable } from 'components'

function Container(props) {
  const handleTitleChange = (newTitle) => {
    props.context.onLayoutChange(props.layoutPath, {
      title: newTitle,
    })
  }
  const handleDelete = () => {
    props.context.onLayoutChange(props.layoutPath, null)
  }
  if (!props.style) {
    return (<layoutRenderers.container {...props} />)
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
      {props.style === 'card' && (
        <Text
          value={props.title || ''}
          onChange={handleTitleChange}
          placeholder="Title"
          block
          className="paragraph CONFORM-editable-card-title"
        />
      )}
      <layoutRenderers.container {...props} title={undefined} />
    </Draggable>
  )
}
Container.propTypes = {
  context: PropTypes.object.isRequired,
  layoutPath: PropTypes.string.isRequired,
}

export default Container
