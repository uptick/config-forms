import React from 'react'
import { TouchableHighlight, View, Text, Alert } from 'react-native'

import Style from '../style.js'

class Controllable extends React.PureComponent {
  handleRemovePress = () => {
    Alert.alert(
      'Discard Item',
      `Are you sure you want to remove this item?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          onPress: () => {
            this.props.onRemove()
          },
        },
      ],
      {cancelable: true},
    )
  }
  render() {
    let remove
    if (typeof this.props.onRemove === 'function') {
      remove = (
        <TouchableHighlight
          onPress={this.handleRemovePress}
        >
          <View style={{
            backgroundColor: Style.primaryContent,
            paddingTop: 0,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: Style.primaryColour,
          }}>
            <Text style={{
              color: Style.primaryColour,
              fontSize: 20,
            }}>x</Text>
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
            position: 'absolute',
            right: 7,
            top: 7,
          }}>
            {remove}
          </View>
        )}
      </View>
    )
  }
}

export default Controllable
