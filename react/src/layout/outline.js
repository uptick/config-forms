import React from 'react'

class Outline extends React.Component {
  render() {
    return (
      <div className="CONFORM-outline">
        {this.props.children}
      </div>
    )
  }
}

export default Outline
