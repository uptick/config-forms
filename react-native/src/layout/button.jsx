import React from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'

import Style from '../style.js'

export default class Button extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.props.onClick}
          underlayColor={'#007bff66'}
          activeOpacity={1}
        >
          <View style={styles.button}>
            <Text style={{
              color: Style.primaryContent,
              textAlign: 'center',
            }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.contentBackground,
    marginBottom: Style.standardMargin,
  },
  button: {
    backgroundColor: Style.primaryColour,
    paddingTop: Style.standardMargin / 2,
    paddingBottom: Style.standardMargin / 2,
    paddingLeft: Style.standardMargin,
    paddingRight: Style.standardMargin,
    borderRadius: 6,
  },
})
