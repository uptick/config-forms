import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

import TYPES from '../dnd-types.js'

function ContentBox(props) {
  const [{isDragHappening, isActive, activeHeight, grabPadding}, insideDrop] = useDrop({
    accept: [TYPES.EXISTING, TYPES.NEW],
    drop: (item) => {
      switch (item.type) {
        case TYPES.NEW: {
          props.onDropNew(
            item.value,
            'inside',
            props.identifier
          )
          break
        }
        case TYPES.EXISTING: {
          props.onDropExisting(
            item.value,
            'inside',
            props.identifier
          )
          break
        }
      }
    },
    collect: (monitor) => {
      const item = monitor.getItem()
      return ({
        isDragHappening: item !== null,
        isActive: monitor.canDrop() && monitor.isOver(),
        activeHeight: (item && item.height) || 40,
        grabPadding: (item && item.grabPadding) || {left: 0, top: 0, right: 0, bottom: 0},
      })
    },
  })
  return (
    <div className="content-box" style={{minHeight: isActive ? activeHeight : 40}}>
      <p className="no-contents">(no contents)</p>
      {isDragHappening && (
        <div
          className="drop-zone"
          ref={insideDrop}
          style={{
            left: -grabPadding.left,
            right: grabPadding.right,
            top: -grabPadding.top,
            bottom: grabPadding.bottom,
          }}
        />
      )}
    </div>
  )
}
ContentBox.propTypes = {
}

export default ContentBox
