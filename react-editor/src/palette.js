import React from 'react'
import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types'

const TYPES = {
  FIELD: 'CONFIG_FORMS_FIELD',
  LAYOUT: 'CONFIG_FORMS_LAYOUT',
}

function FieldItem(props) {
  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: TYPES.FIELD,
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
