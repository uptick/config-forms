import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Style from '../style.js'

export default class Card extends React.PureComponent {
  render() {
    let title
    if (this.props.title) {
      title = (
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.card}>
        {title}
        <View style={styles.content}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Style.contentBackground,
  },
  content: {
    paddingTop: Style.standardMargin,
    paddingLeft: Style.standardMargin,
    paddingRight: Style.standardMargin,
  },
  title: {
    backgroundColor: Style.primaryColour,
    paddingLeft: Style.standardMargin,
    paddingRight: Style.standardMargin,
    paddingTop: Style.standardMargin / 1.5,
    paddingBottom: Style.standardMargin / 1.5,
  },
  titleText: {
    color: Style.primaryContent,
  },
})
