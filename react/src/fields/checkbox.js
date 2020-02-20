import React from 'react'
import { Checkbox as MirecoCheckbox } from 'mireco'

class Checkbox extends React.Component {
  render() {
    return (
      <div className="CONFORM-checkbox">
        <MirecoCheckbox
          block
          label={this.props.label}
          value={!!this.props.value}
          onChange={(newValue) => {
            this.props.onChange(this.props.fieldKey, newValue)
          }}
        />
      </div>
    )
  }
}

export default Checkbox
