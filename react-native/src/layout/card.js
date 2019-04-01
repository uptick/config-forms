import React from 'react'
import { Text, View } from 'react-native'

import CardSection from './card-section.js'
import Style from '../style.js'

class Card extends React.PureComponent {
  render() {
    let title
    if (this.props.title) {
      title = (
        <CardSection backgroundColor={Style.primaryColour} title>
          <Text style={{
            color: Style.primaryContent,
            marginBottom: Style.standardMargin / 1.5,
          }}>
            {this.props.title}
          </Text>
        </CardSection>
      )
    }
    return (
      <View
        style={{
          backgroundColor: Style.contentBackground,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.35,
          shadowRadius: 2,
          elevation: 5,
          marginBottom: Style.standardMargin,
        }}
      >
        {title}
        {this.props.children}
      </View>
    )
  }
}

export default Card
