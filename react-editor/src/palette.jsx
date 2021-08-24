import React from 'react'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import TYPES from './dnd-types.js'

function Item(props) {
  const opacity = 1
  return (
    <Draggable draggableId={props.identifier} index={props.index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          style={{opacity: opacity}}
          className="item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.children}
        </li>
      )}
    </Draggable>
  )
}
Item.propTypes = {
  children: PropTypes.string,
  itemType: PropTypes.string,
  config: PropTypes.object,
}

function Palette(props) {
  return (
    <Droppable droppableId="palette">
      {(provided, snapshot) => (
        <ul className="CONFORM-palette">
          {props.itemTypes.map((itemType, index) => {
            return (
              <Item
                key={itemType.label}
                {...itemType}
                index={index}
              >
                {itemType.label}
              </Item>
            )
          })}
        </ul>
      )}
    </Droppable>
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
      identifier: 'text-field',
      itemType: 'field',
      label: 'Text Input',
      config: {
        fieldType: 'text',
      },
    },
    {
      identifier: 'textarea-field',
      itemType: 'field',
      label: 'Textarea Input',
      config: {
        fieldType: 'textarea',
      },
    },
    {
      identifier: 'checkbox-field',
      itemType: 'field',
      label: 'Checkbox Input',
      config: {
        fieldType: 'checkbox',
      },
    },
    {
      identifier: 'card-layout',
      itemType: 'container',
      label: 'Card',
      config: {
        style: 'card',
      },
    },
    {
      identifier: 'outline-layout',
      itemType: 'container',
      label: 'Outline',
      config: {
        style: 'outline',
      },
    },
    {
      identifier: 'text-layout',
      itemType: 'text',
      label: 'Display Text',
    },
  ],
}

export default Palette
