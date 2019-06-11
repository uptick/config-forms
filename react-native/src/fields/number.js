import React from 'react'
import { View, Text as RNText, TextInput } from 'react-native'

import { InfoLabel } from '.'
import Style from '../style.js'

class Number extends React.PureComponent {
  state = {
    focused: false,
  }
  render() {
    let text
    if (this.props.editable) {
      text = (
        <TextInput
          value={this.props.value}
          onChangeText={(newValue) => {
            this.props.onChange(this.props.fieldKey, newValue)
          }}
          placeholder={this.props.placeholder}
          onFocus={() => {
            this.setState({focused: true})
          }}
          onBlur={() => {
            this.setState({focused: false})
          }}
          multiline={this.props.multiline}
          style={this.props.style}
          underlineColorAndroid={'transparent'}
          selectionColor={Style.primaryColour}
          keyboardType={'numeric'}
        />
      )
    }
    else {
      text = (
        <RNText style={{
          marginTop: 10,
          marginBottom: 10,
        }}>{this.props.value}</RNText>
      )
    }

    let component = (
      <View style={{
        borderBottomWidth: 1,
        borderBottomColor: this.state.focused ? Style.primaryColour : Style.contentFaint,
        paddingBottom: 5,
        marginTop: 5,
        marginBottom: 20,
      }}>
        {text}
      </View>
    )
    if (this.props.label) {
      component = (
        <View style={{
          marginBottom: Style.standardMargin,
        }}>
          {this.props.label && (
            <InfoLabel>{this.props.label}</InfoLabel>
          )}
          {component}
        </View>
      )
    }
    return component
  }
}

export default Number
