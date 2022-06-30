import React from 'react'
import { View, Text, Switch } from 'react-native'

import { InfoLabel } from '.'
import Style from '../style.js'

class Checkbox extends React.PureComponent {
  render() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Style.standardMargin,
      }}>
        <InfoLabel
          style={{
            flex: 1,
          }}
          description={this.props.description}
        >
          {this.props.label}
        </InfoLabel>
        <Switch
          value={this.props.value}
          title={this.props.label}
          trackColor={{
            true: Style.primaryColour,
            false: null,
          }}
          onValueChange={(newValue) => {
            this.props.onChange(this.props.fieldKey, newValue)
          }}
        />
      </View>
    )
  }
}

export default Checkbox
