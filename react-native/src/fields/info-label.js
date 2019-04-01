import React from 'react'
import { Text, View, Modal, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Button } from '../layout'

class InfoLabel extends React.PureComponent {
  state = {
    modalOpen: false,
  }
  handlePress = () => {
    if (this.props.description) {
      this.setState({modalOpen: true})
    }
  }
  closeModal = () => {
    this.setState({modalOpen: false})
  }
  render() {
    let prompt
    if (this.props.description) {
      prompt = (<Text> <Icon name="info" color="#00aeef" size={14} /></Text>)
    }
    return (
      <View style={this.props.style}>
        <Text onPress={this.handlePress}>{this.props.children}{prompt}</Text>
        {this.state.modalOpen && (
          <Modal
            onRequestClose={this.closeModal}
            animationType="fade"
            presentationStyle="pageSheet"
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
