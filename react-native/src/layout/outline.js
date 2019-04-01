import React from 'react'
import { View } from 'react-native'

import Style from '../style.js'


class Outline extends React.PureComponent {
  render() {
    return (
      <View style={{
        padding: Style.standardMargin,
        paddingBottom: 0,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: Style.standardMargin,
      }}>
        {this.props.children}
      </View>
    )
  }
}

export default Outline
