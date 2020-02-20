import React from 'react'

import Text from './text.js'

class Number extends React.PureComponent {
  render() {
    return (
      <Text
        {...this.props}
        keyboardType="numeric"
        placeholder={this.props.placeholder || 'Number'}
      />
    )
  }
}

export default Number
