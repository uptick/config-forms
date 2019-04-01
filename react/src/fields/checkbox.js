import React from 'react'
import Mireco from 'mireco'

class Checkbox extends React.Component {
  render() {
    return (
      <Mireco.Checkbox
        block
        label={this.props.label}
        value={!!this.props.value}
        onChange={(newValue) => {
          this.props.onChange(this.props.fieldKey, newValue)
        }}
      />
    )
  }
}

export default Checkbox
