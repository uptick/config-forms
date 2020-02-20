import React from 'react'
import { View, Text as RNText, TextInput, StyleSheet } from 'react-native'

import { InfoLabel } from '.'
import Style from '../style.js'

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
})

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
          placeholder={this.props.placeholder || 'Text'}
          onFocus={() => {
            this.setState({focused: true})
          }}
          onBlur={() => {
            this.setState({focused: false})
          }}
          multiline={this.props.multiline}
          underlineColorAndroid="transparent"
          style={[styles.input, this.props.style]}
          selectionColor={Style.primaryColour}
          keyboardType={this.props.keyboardType}
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
        <React.Fragment>
          <InfoLabel
            description={this.props.description}
            style={{marginBottom: 8}}
          >
            {this.props.label}
          </InfoLabel>
          {component}
        </React.Fragment>
      )
    }
    return component
  }
}

export default Text
