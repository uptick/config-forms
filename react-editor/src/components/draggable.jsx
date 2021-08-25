import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { Button } from 'mireco/inputs'
import classNames from 'classnames'

import TYPES from '../dnd-types.js'

function useMouseCoords() {
  const coords = useRef({x: 0, y: 0})
  const recordCoords = (event) => {
    coords.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }
  useEffect(() => {
    document.addEventListener('mousemove', recordCoords)
    return () => {
      document.removeEventListener('mousemove', recordCoords)
    }
  })
  const getCoords = () => {
    return coords.current
  }
  return getCoords
}

function Draggable(props) {
  const getCoords = useMouseCoords()
  const draggableRef = useRef()
  const [{ isBeingDragged, opacity }, drag, preview] = useDrag({
    type: TYPES.EXISTING,
    item: () => {
      let grabPadding = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      }
      if (draggableRef.current) {
        const rect = draggableRef.current.getBoundingClientRect()
        const mouseCoords = getCoords()
        grabPadding = {
          left: rect.right - mouseCoords.x,
          right: mouseCoords.x - rect.left,
          bottom: mouseCoords.y - rect.top,
          top: rect.bottom - mouseCoords.y,
        }
      }
      return ({
        type: TYPES.EXISTING,
        value: props.identifier,
        height: draggableRef.current && draggableRef.current.clientHeight,
        grabPadding,
      })
    },
    collect: (monitor) => ({
      isBeingDragged: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  })
  const [{
    isDragHappening,
    isActive: isBeforeActive,
    activeHeight,
    grabPadding,
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
        grabPadding: (item && item.grabPadding) || {left: 0, top: 0, right: 0, bottom: 0},
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
        <div className="handle" ref={drag} />
        <div
          className="contents"
          style={{
            paddingTop: isBeforeActive ? activeHeight : 0,
            paddingBottom: isAfterActive ? activeHeight : 0,
          }}
        >
          {!isBeingDragged && isDragHappening && (
            <div
              className="drop-adjacent before"
              ref={beforeDrop}
              style={{
                top: -grabPadding.top,
                paddingTop: grabPadding.top,
                left: -grabPadding.left,
                paddingLeft: grabPadding.left,
                paddingRight: grabPadding.right,
              }}
            />
          )}
          {!isBeingDragged && isDragHappening && (
            <div
              className="drop-adjacent after"
              ref={afterDrop}
              style={{
                paddingBottom: grabPadding.bottom,
                bottom: -grabPadding.bottom,
                left: -grabPadding.left,
                paddingLeft: grabPadding.left,
                paddingRight: grabPadding.right,
              }}
            />
          )}
          <div ref={preview}>
            {props.children}
          </div>
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
