import React from 'react'
import { Textarea as MirecoTextarea } from 'mireco'

class Textarea extends React.Component {
  render() {
    let component = (
      <MirecoTextarea
        block
        value={this.props.value || ''}
        onChange={(newValue) => {
          this.props.onChange(this.props.fieldKey, newValue)
        }}
        placeholder={this.props.placeholder || 'Text'}
      />
    )
    if (this.props.label) {
      component = (
        <label>
          {this.props.label}
          {component}
        </label>
      )
    }
    return (
      <div className="CONFORM-textarea">
        {component}
      </div>
    )
  }
}

export default Textarea
