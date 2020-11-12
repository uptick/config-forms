import React from 'react'
import PropTypes from 'prop-types'
import { layoutRenderers } from 'config-forms-react'

import { Draggable } from 'components'

function Container(props) {
  const handleDelete = () => {
    console.log('delete of container at', props.layoutPath)
  }
  if (!props.style) {
    return (<layoutRenderers.container {...props} />)
  }
  return (
    <Draggable
      fieldKey={props.fieldKey}
      onDelete={handleDelete}
      onDropNew={props.context.onDropNew}
      onDropExisting={props.context.onDropExisting}
    >
      <layoutRenderers.container {...props} />
    </Draggable>
  )
}
Container.propTypes = {
  context: PropTypes.object.isRequired,
  layoutPath: PropTypes.string.isRequired,
}

export default Container
