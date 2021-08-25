import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types'

import TYPES from './dnd-types.js'

function Item(props) {
  const [{ opacity }, dragRef] = useDrag({
    type: TYPES.NEW,
    item: {
      type: TYPES.NEW,
      value: {
        type: props.itemType,
        ...props.config || {},
      },
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })
  return (
    <li ref={dragRef} className="item" style={{opacity: opacity}}>{props.children}</li>
  )
}
Item.propTypes = {
  children: PropTypes.string,
  itemType: PropTypes.string,
  config: PropTypes.object,
}

function Palette(props) {
  return (
    <ul className="CONFORM-palette">
      {props.itemTypes.map((itemType) => {
        return (
          <Item
            key={itemType.label}
            {...itemType}
          >
            {itemType.label}
          </Item>
        )
      })}
    </ul>
  )
}
Palette.propTypes = {
  itemTypes: PropTypes.arrayOf(PropTypes.shape({
    itemType: PropTypes.string,
    label: PropTypes.string,
    config: PropTypes.object,
  })).isRequired,
}
Palette.defaultProps = {
  itemTypes: [
    {
      itemType: 'field',
      label: 'Text Input',
      config: {
        fieldType: 'text',
      },
    },
    {
      itemType: 'field',
      label: 'Textarea Input',
      config: {
        fieldType: 'textarea',
      },
    },
    {
      itemType: 'field',
      label: 'Checkbox Input',
      config: {
        fieldType: 'checkbox',
      },
    },
    {
      itemType: 'container',
      label: 'Card',
      config: {
        style: 'card',
      },
    },
    {
      itemType: 'container',
      label: 'Outline',
      config: {
        style: 'outline',
      },
    },
    {
      itemType: 'text',
      label: 'Display Text',
    },
  ],
}

export default Palette
