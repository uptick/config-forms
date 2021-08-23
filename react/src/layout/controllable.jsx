import React from 'react'
import { Button } from 'mireco/inputs'

class Controllable extends React.Component {
  render() {
    let remove
    if (typeof this.props.onRemove === 'function') {
      remove = (
        <Button block tabIndex={-1} onClick={this.props.onRemove}>×</Button>
      )
    }
    return (
      <div className="CONFORM-controllable">
        <div className="contents">{this.props.children}</div>
        {(remove) && (
          <div className="controls">
            {remove}
          </div>
        )}
      </div>
    )
  }
}

export default Controllable
