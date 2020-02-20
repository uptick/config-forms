import React from 'react'
import { Button as MirecoButton } from 'mireco'

class Button extends React.Component {
  render() {
    return (
      <div className="CONFORM-button">
        <MirecoButton
          block
          onClick={this.props.onClick}
        >
          {this.props.title}
        </MirecoButton>
      </div>
    )
  }
}

export default Button
