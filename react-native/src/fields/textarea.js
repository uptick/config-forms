import React from 'react'

import Text from './text.js'

class Textarea extends React.PureComponent {
  render() {
    return (
      <Text
        {...this.props}
        multiline
        style={{
          minHeight: 40,
        }}
      />
    )
  }
}

export default Textarea
