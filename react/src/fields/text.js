import React from 'react'
import Mireco from 'mireco'

class Text extends React.Component {
  render() {
    let component = (
      <Mireco.Text
        block
        value={this.props.value || ''}
        onChange={(newValue) => {
          this.props.onChange(this.props.fieldKey, newValue)
        }}
        placeholder={this.props.placeholder}
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
