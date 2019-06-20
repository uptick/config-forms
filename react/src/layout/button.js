import React from 'react'
import Mireco from 'mireco'

class Button extends React.Component {
  render() {
    return (
      <div className="CONFORM-button">
        <Mireco.Button
          block
          onClick={this.props.onClick}
        >
          {this.props.title}
        </Mireco.Button>
      </div>
    )
  }
}

export default Button
