import React from 'react'
import { View } from 'react-native'

import Style from '../style.js'

class CardSection extends React.PureComponent {
  static defaultProps = {
    backgroundColor: 'transparent',
    last: false,
    title: false,
  }
  render() {
    let style = {
      padding: Style.standardMargin,
      paddingBottom: 0,
      backgroundColor: this.props.backgroundColor,
    }
    if (this.props.title) {
      style.paddingTop = Style.standardMargin / 1.5
    }
    if (!this.props.last && this.props.backgroundColor === 'transparent') {
      style = {
        ...style,
        borderBottomColor: Style.contentFaint,
        borderBottomWidth: 1,
      }
    }
    return (
      <View style={style}>
        {this.props.children}
      </View>
    )
  }
}

export default CardSection
