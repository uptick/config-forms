import React from 'react'

class Outline extends React.Component {
  render() {
    return (
      <div className="CONFORM-outline">
        <div className="outline">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Outline
