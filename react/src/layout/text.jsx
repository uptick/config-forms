import React from 'react'

class Text extends React.Component {
  render() {
    return (
      <p className="CONFORM-text">{this.props.text}</p>
    )
  }
}

export default Text
