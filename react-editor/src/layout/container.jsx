import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'mireco/inputs'
import layoutRenderers from 'config-forms-react/layout-renderers'

import Draggable from '../components/draggable.jsx'
import ContentBox from '../components/content-box.jsx'

function Container(props) {
  const handleTitleChange = (newTitle) => {
    props.context.onLayoutChange(props.layoutPath, {
      title: newTitle,
    })
  }
  const handleDelete = () => {
    props.context.onLayoutChange(props.layoutPath, null)
  }
  const identifier = {
    type: 'layout',
    path: props.layoutPath,
  }
  let containerChildren = props.children
  if (!containerChildren || (Array.isArray(containerChildren) && containerChildren.length == 0)) {
    containerChildren = (
      <ContentBox
        identifier={identifier}
        onDropNew={props.context.onDropNew}
        onDropExisting={props.context.onDropExisting}
      />
    )
  }
  if (!props.style) {
    return (
      <layoutRenderers.container
        {...props}
      >
        {containerChildren}
      </layoutRenderers.container>
    )
  }
  return (
    <Draggable
      identifier={identifier}
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
      <layoutRenderers.container
        {...props}
        title={undefined}
      >
        {containerChildren}
      </layoutRenderers.container>
    </Draggable>
  )
}
Container.propTypes = {
  context: PropTypes.object.isRequired,
  layoutPath: PropTypes.string.isRequired,
}

export default Container
