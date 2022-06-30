import React from 'react'
import { View, Text } from 'react-native'

import { Card, Outline } from './layout'

class FormContainer extends React.PureComponent {
  static defaultProps = {
    showValue: false,
  }
  render() {
    let contents = (
      <View>
        {this.props.children}
        {!this.props.subform && this.props.showValue && (
          <Text>{JSON.stringify(this.props.value)}</Text>
        )}
      </View>
    )
    if (!this.props.subform) {
      contents = (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            flex: 1,
            alignItems: 'stretch',
            maxWidth: 540,
          }}>
            {contents}
          </View>
        </View>
      )
    }
    return contents
  }
}

export default FormContainer
