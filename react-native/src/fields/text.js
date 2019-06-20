import React from 'react'
import { View, Text as RNText, TextInput } from 'react-native'

import { InfoLabel } from '.'
import Style from '../style.js'

class Text extends React.PureComponent {
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
        />
      )
    }
    else {
      text = (
        <RNText style={{
          marginBottom: 20,
        }}>
          {this.props.value}
        </RNText>
      )
    }

    let component = (
      <View style={{
        borderBottomWidth: 1,
        borderBottomColor: this.state.focused ? Style.primaryColour : Style.contentFaint,
        marginBottom: 20,
      }}>
        {text}
      </View>
    )
    if (this.props.label || this.props.description) {
      component = (
        <View style={{
          marginBottom: Style.standardMargin,
        }}>
          <InfoLabel description={this.props.description}>{this.props.label}</InfoLabel>
          {component}
        </View>
      )
    }
    return component
  }
}

export default Text
