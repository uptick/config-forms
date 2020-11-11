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
    <li ref={dragRef} style={{opacity: opacity}}>{props.children}</li>
  )
}
FieldItem.propTypes = {
  children: PropTypes.string,
  value: PropTypes.string.isRequired,
}

function Palette(props) {
  return (
    <ul className="CONFORM-palette">
      {props.itemTypes.map((itemType) => {
        return (<FieldItem key={itemType.key} value={itemType.key}>{itemType.label}</FieldItem>)
      })}
    </ul>
  )
}
Palette.propTypes = {
  itemTypes: PropTypes.arrayOf(PropTypes.shape({
    itemType: PropTypes.oneOf(['FIELD', 'LAYOUT']),
    key: PropTypes.string,
    label: PropTypes.string,
    config: PropTypes.object,
  })).isRequired,
}

export default Palette
