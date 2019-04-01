import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'

import Style from '../style.js'

class Controllable extends React.PureComponent {
  render() {
    let remove
    if (typeof this.props.onRemove === 'function') {
      remove = (
        <TouchableHighlight
          onPress={this.props.onRemove}
        >
          <View style={{
            backgroundColor: Style.primaryColour,
            padding: 12,
            paddingTop: 7,
            paddingBottom: 7,
            borderRadius: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.35,
            shadowRadius: 2,
            elevation: 5,
          }}>
            <Text style={{
              color: Style.primaryContent,
            }}>X</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
        }}>
          {this.props.children}
        </View>
        {(remove) && (
          <View style={{
            marginLeft: 8,
          }}>
            {remove}
          </View>
        )}
      </View>
    )
  }
}

export default Controllable
