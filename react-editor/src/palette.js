import React from 'react'
import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types'

import TYPES from 'dnd-types.js'

function FieldItem(props) {
  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: TYPES.NEW,
      value: props.value
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })
  return (
    <p ref={dragRef} style={{opacity: opacity}}>{props.children}</p>
  )
}
FieldItem.propTypes = {
  children: PropTypes.string,
  value: PropTypes.string.isRequired,
}

function Palette(props) {
  return (
    <>
      <p>This is the palette of items</p>
      <FieldItem value="text">Text</FieldItem>
      <FieldItem value="textarea">Text Area</FieldItem>
    </>
  )
}

export default Palette
