import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { Button } from 'mireco/inputs'
import classNames from 'classnames'

import TYPES from '../dnd-types.js'

function Draggable(props) {
  const draggableRef = useRef()
  const [{ isBeingDragged, opacity }, drag, preview] = useDrag({
    type: TYPES.EXISTING,
    item: () => ({
      type: TYPES.EXISTING,
      value: props.identifier,
      height: draggableRef.current && draggableRef.current.clientHeight,
    }),
    collect: (monitor) => ({
      isBeingDragged: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  })
  const [{
    isDragHappening,
    isActive: isBeforeActive,
    activeHeight,
    activeWidth,
  }, beforeDrop] = useDrop({
    accept: [TYPES.EXISTING, TYPES.NEW],
    drop: (item) => {
      switch (item.type) {
        case TYPES.NEW: {
          props.onDropNew(
            item.value,
            'before',
            props.identifier
          )
          break
        }
        case TYPES.EXISTING: {
          props.onDropExisting(
            item.value,
            'before',
            props.identifier
          )
          break
        }
      }
    },
    collect: (monitor) => {
      const item = monitor.getItem()
      return {
        isDragHappening: item !== null,
        isActive: monitor.canDrop() && monitor.isOver(),
        activeHeight: (item && item.height) || 40,
      }
    },
  })
  const [{isActive: isAfterActive}, afterDrop] = useDrop({
    accept: [TYPES.EXISTING, TYPES.NEW],
    drop: (item) => {
      switch (item.type) {
        case TYPES.NEW: {
          props.onDropNew(
            item.value,
            'after',
            props.identifier
          )
          break
        }
        case TYPES.EXISTING: {
          props.onDropExisting(
            item.value,
            'after',
            props.identifier
          )
          break
        }
      }
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  })
  const deletable = typeof props.onDelete === 'function'
  return (
    <>
      <div
        ref={draggableRef}
        className={classNames('draggable', {
          'drag-happening': isDragHappening,
        })}
        style={{
          opacity,
        }}
      >
        <div className="handle" ref={drag} style={{
          opacity,
        }} />
        <div
          className="contents"
          ref={preview}
          style={{
            paddingTop: isBeforeActive ? activeHeight : 0,
            paddingBottom: isAfterActive ? activeHeight : 0,
          }}
        >
          {!isBeingDragged && isDragHappening && (
            <div className="drop-adjacent before" ref={beforeDrop}></div>
          )}
          {!isBeingDragged && isDragHappening && (
            <div className="drop-adjacent after" ref={afterDrop}></div>
          )}
          {props.children}
        </div>
        {deletable && <Button className="delete" onClick={props.onDelete}>✕</Button>}
      </div>
    </>
  )
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
