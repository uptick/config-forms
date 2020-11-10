import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import { Button } from 'mireco'

import TYPES from 'dnd-types.js'

function Draggable(props) {
  const [{ visibility }, drag, preview] = useDrag({
    item: {
      type: TYPES.EXISTING,
      value: props.value
    },
    collect: (monitor) => ({
      visibility: monitor.isDragging() ? 'hidden' : 'visible',
    }),
  })
  const deletable = typeof props.onDelete === 'function'
  return (
    <>
      <span ref={preview}></span>
      <div className="draggable" style={{visibility: visibility}}>
        <div className="handle" ref={drag}></div>
        <div className="contents">{props.children}</div>
        {deletable && <Button className="delete" onClick={props.onDelete}>✕</Button>}
      </div>
    </>
  )
}
Draggable.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,
}

export default Draggable
