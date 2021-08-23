import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'mireco/inputs'
import classNames from 'classnames'
import { Draggable as DndDraggable } from 'react-beautiful-dnd'

import TYPES from '../dnd-types.js'

function Draggable(props) {
  // const [{ isBeingDragged, opacity }, drag, preview] = useDrag({
  //   item: {
  //     type: TYPES.EXISTING,
  //     value: props.identifier,
  //   },
  //   collect: (monitor) => ({
  //     isBeingDragged: monitor.isDragging(),
  //     opacity: monitor.isDragging() ? 0 : 1,
  //   }),
  // })
  // const [{ isDragHappening }, beforeDrop] = useDrop({
  //   accept: [TYPES.EXISTING, TYPES.NEW],
  //   drop: (item) => {
  //     switch (item.type) {
  //       case TYPES.NEW: {
  //         props.onDropNew(
  //           item.value,
  //           'before',
  //           props.identifier
  //         )
  //         break
  //       }
  //       case TYPES.EXISTING: {
  //         props.onDropExisting(
  //           item.value,
  //           'before',
  //           props.identifier
  //         )
  //         break
  //       }
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isDragHappening: monitor.getItem() !== null,
  //   }),
  // })
  // const [afterCollectedProps, afterDrop] = useDrop({
  //   accept: [TYPES.EXISTING, TYPES.NEW],
  //   drop: (item) => {
  //     switch (item.type) {
  //       case TYPES.NEW: {
  //         props.onDropNew(
  //           item.value,
  //           'after',
  //           props.identifier
  //         )
  //         break
  //       }
  //       case TYPES.EXISTING: {
  //         props.onDropExisting(
  //           item.value,
  //           'after',
  //           props.identifier
  //         )
  //         break
  //       }
  //     }
  //   },
  // })

  const deletable = typeof props.onDelete === 'function'

    // <DndDraggable draggableId={props.identifier}>
  return (
    <div
      className="draggable"
    >
      <div className="handle" />
      <div className="contents">
        {props.children}
      </div>
      {deletable && (
        <Button className="delete" onClick={props.onDelete}>✕</Button>
      )}
    </div>
  )
    // </DndDraggable>
}
Draggable.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,
  onDropNew: PropTypes.func,
  onDropExisting: PropTypes.func,
  fieldKey: PropTypes.string,
  identifier: PropTypes.shape({
    type: PropTypes.oneOf(['field', 'layout']),
    field: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
}

export default Draggable
