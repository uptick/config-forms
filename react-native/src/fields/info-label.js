import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Button } from '../layout'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
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

function InfoLabel(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const hasDescription = () => {
    return !!props.description
  }
  const handlePress = () => {
    if (hasDescription()) {
      setModalOpen(true)
    }
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  let infoPrompt = null
  if (props.description) {
    infoPrompt = (
      <Icon name="info" color="#00aeef" size={14} />
    )
  }
  return (
    <View style={props.style}>
      <TouchableHighlight
        onPress={handlePress}
        underlayColor="#fff0"
        activeOpacity={1}
      >
        <Text>
          {infoPrompt}
          {!!infoPrompt && ' '}
          {props.children}
        </Text>
      </TouchableHighlight>
      {hasDescription() && (
        <Modal
          animationType="fade"
          onRequestClose={closeModal}
          visible={modalOpen}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.modalHeader}>{props.children}</Text>
              <ScrollView style={styles.modalBodyWrapper}>
                <Text style={styles.modalBody}>{props.description}</Text>
              </ScrollView>
              <View style={styles.modalControls}>
                <Button title="Close" onClick={closeModal} />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  )
}

export default React.memo(InfoLabel)
