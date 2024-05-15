import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, ScrollView, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { useGlobalState } from './GlobalContext';
import { Ionicons } from '@expo/vector-icons';

export default function ShelfScreen({ navigation }) {
  const { lists, createList, removeList, toggleListPrivacy } = useGlobalState();
  const [newListName, setNewListName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false); // Estado para o modal de ajuda

  const [isPrivate, setIsPrivate] = useState(false);

  const handleRemoveList = (listName) => {
    removeList(listName);
    ToastAndroid.show(`${listName} removed`, ToastAndroid.SHORT);
  };

  const toggleAllListsPrivacy = () => {
    Object.keys(lists).forEach(listName => {
      toggleListPrivacy(listName);
    });
    setIsPrivate(!isPrivate);
    ToastAndroid.show(`Your shelf is now ${isPrivate ? 'public' : 'private'}`, ToastAndroid.SHORT);
  };

  const handleTogglePrivacy = (listName) => {
    toggleListPrivacy(listName);
    ToastAndroid.show(`${listName} is now ${lists[listName].isPrivate ? 'public' : 'private'}`, ToastAndroid.SHORT);
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      setModalVisible(false);
    } else {
      Alert.alert('Invalid name', 'Please enter a valid name for the list.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Shelf</Text>
        <TouchableOpacity style={styles.lockButton} onPress={toggleAllListsPrivacy}>
          <Ionicons name={isPrivate ? "lock-closed-outline" : "lock-open-outline"} size={30} color="gray" />
          <Text style={styles.lockButtonText}>{isPrivate ? "Make Public" : "Make Private"}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Your Lists</Text>
        <TouchableOpacity onPress={() => setHelpModalVisible(true)} style={styles.helpIcon}>
          <Ionicons name="help-circle-outline" size={28} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.shelfContainer}>
        {Object.keys(lists).map((listName, index) => (
          <View key={index} style={styles.listCard}>
            <TouchableOpacity
              style={styles.listButton}
              onPress={() => navigation.navigate('ListsScreen', { listName })}
            >
              <Text style={styles.listText}>{listName}</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleTogglePrivacy(listName)} style={styles.iconButton}>
                <Ionicons name={lists[listName].isPrivate ? "lock-closed-outline" : "lock-open-outline"} size={24} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveList(listName)} style={styles.iconButton}>
                <Ionicons name="remove-circle-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={50} color="#3A8D5B" />
          <Text style={styles.addButtonText}>Add New List</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Enter new list name"
              value={newListName}
              onChangeText={setNewListName}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.individualButton}>
                <Button color="#3A8D5B" title="Create List" onPress={handleCreateList} />
              </View>
              <View style={styles.individualButton}>
                <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => {
          setHelpModalVisible(!helpModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>How to Create Lists</Text>
            <Text style={styles.modalDescription}>
              1. Click on the "Add New List" button.
              {'\n'}2. Enter a name for your new list.
              {'\n'}3. Click "Create List" to save.
              {'\n'}4. You can toggle the privacy of each list by clicking on the lock icon.
              {'\n'}5. Remove a list by clicking the remove icon.
            </Text>
            <View style={styles.buttonContainer}>
              <Button color='#3A8D5B' title="Got it" onPress={() => setHelpModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop:30,
  },
  title: {
    fontSize: 33,
    color: 'darkgreen',
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockButtonText: {
    marginLeft: 10,
    color: 'gray',
  },
  helpIcon: {
    marginLeft: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A8D5B',
  },
  shelfContainer: {
    width: '100%',
    alignItems: 'center',
  },
  listCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  listButton: {
    flex: 1,
  },
  listText: {
    fontSize: 18,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#3A8D5B',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '80%', // Ensure the modal is not excessively wide on larger screens
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  individualButton: {
    marginTop: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
  }
});
