import React from 'react'
import { Text as RNText } from 'react-native'

class Text extends React.PureComponent {
  render() {
    return (
      <RNText style={{
        marginBottom: 20,
      }}>
        {this.props.text}
      </RNText>
    )
  }
}

export default Text
