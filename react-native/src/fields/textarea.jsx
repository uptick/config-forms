import React from 'react'

import Text from './text.jsx'

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
