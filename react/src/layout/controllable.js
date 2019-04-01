import React from 'react'
import Mireco from 'mireco'

class Controllable extends React.Component {
  render() {
    let remove
    if (typeof this.props.onRemove === 'function') {
      remove = (
        <Mireco.Button block tabIndex={-1} onClick={this.props.onRemove}>×</Mireco.Button>
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
