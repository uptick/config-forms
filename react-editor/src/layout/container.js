import React from 'react'
import PropTypes from 'prop-types'
import { layoutRenderers } from 'config-forms-react'

import { Draggable } from 'components'

function Container(props) {
  const handleDelete = () => {
    props.context.onLayoutChange(props.layoutPath, null)
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
