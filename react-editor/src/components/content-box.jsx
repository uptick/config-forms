import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

import TYPES from '../dnd-types.js'

function ContentBox(props) {
  const [{ isDragHappening }, insideDrop] = useDrop({
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
    collect: (monitor) => ({
      isDragHappening: monitor.getItem() !== null,
    }),
  })
  return (
    <div className="content-box">
      <p className="no-contents">(no contents)</p>
      {isDragHappening && (<div className="drop-zone" ref={insideDrop} />)}
    </div>
  )
}
ContentBox.propTypes = {
}

export default ContentBox
