import React from 'react'
import Mireco from 'mireco'

class Button extends React.Component {
  render() {
    return (
      <Mireco.Button
        block
        className="CONFORM-button"
        onClick={this.props.onClick}
      >
        {this.props.title}
      </Mireco.Button>
    )
  }
}

export default Button
