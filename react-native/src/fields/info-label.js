import React from 'react'
import { Text, View, TouchableHighlight, Modal, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Button } from '../layout'

class InfoLabel extends React.PureComponent {
  state = {
    modalOpen: false,
  }
  hasDescription = () => {
    return !!this.props.description
  }
  handlePress = () => {
    if (this.hasDescription()) {
      this.setState({modalOpen: true})
    }
  }
  closeModal = () => {
    this.setState({modalOpen: false})
  }
  render() {
    let infoPrompt = (<View style={{height: 14}} />)
    if (this.props.description) {
      infoPrompt = (
        <Icon name="info" color="#00aeef" size={14} />
      )
    }
    return (
      <View style={this.props.style}>
        <TouchableHighlight
          onPress={this.handlePress}
          underlayColor="#fff0"
          activeOpacity={1}
        >
          <View>
            {infoPrompt}
            <Text>{this.props.children}</Text>
          </View>
        </TouchableHighlight>
        {this.hasDescription() && (
          <Modal
            animationType="fade"
            onRequestClose={this.closeModal}
            visible={this.state.modalOpen}
          >
            <View style={styles.modal}>
              <Text style={styles.modalHeader}>{this.props.children}</Text>
              <ScrollView style={styles.modalBodyWrapper}>
                <Text style={styles.modalBody}>{this.props.description}</Text>
              </ScrollView>
              <View style={styles.modalControls}>
                <Button title="Close" onClick={this.closeModal} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  modalBodyWrapper: {
    flex: 1,
  },
  modalBody: {
    fontSize: 16,
  },
  modalControls: {
    marginTop: 20,
  },
})

export default InfoLabel
