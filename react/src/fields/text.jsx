import React from 'react'
import { Text as MirecoText } from 'mireco/inputs'

class Text extends React.Component {
  render() {
    let component = (
      <MirecoText
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
      <div className="CONFORM-text">
        {component}
      </div>
    )
  }
}

export default Text
