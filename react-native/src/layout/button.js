import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'

import Style from '../style.js'

class Button extends React.PureComponent {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onClick}
        style={{
          marginBottom: Style.standardMargin,
        }}
        underlayColor={'#007bff66'}
        activeOpacity={1}
      >
        <View style={{
          backgroundColor: Style.primaryColour,
          paddingTop: Style.standardMargin / 2,
          paddingBottom: Style.standardMargin / 2,
          paddingLeft: Style.standardMargin,
          paddingRight: Style.standardMargin,
          borderRadius: 6,
        }}>
          <Text style={{
            color: Style.primaryContent,
            textAlign: 'center',
          }}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default Button
