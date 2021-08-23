import React from 'react'

class Placeholder extends React.Component {
  render() {
    return (
      <div className="CONFORM-warning">
        Could not find field type "{this.props.type}".
      </div>
    )
  }
}

export default Placeholder
