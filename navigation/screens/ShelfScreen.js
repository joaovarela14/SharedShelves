import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, ScrollView, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { useGlobalState } from './GlobalContext'; // Importe o contexto
import booksData from '../../books.json'; // Importa o arquivo JSON com dados dos livros
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons

export default function ShelfScreen({ navigation }) {
  const { lists, createList, removeList, toggleListPrivacy } = useGlobalState();
  const [newListName, setNewListName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false); // Estado para controle de privacidade

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
      </View>
      <TouchableOpacity style={styles.lockContainer}>
        <Ionicons name={isPrivate ? "lock-closed-outline" : "lock-open-outline"} size={50} color="gray" onPress={toggleAllListsPrivacy}/>
      </TouchableOpacity>
      <View style={styles.shelfcontainer}>
        {Object.keys(lists).map((listName, index) => (
            <View key={index} style={styles.listItem}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ListsScreen', { listName })}
                >
                    <Text style={styles.listText}>{listName}</Text>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => handleTogglePrivacy(listName)} style={styles.iconButton}>
                        <Ionicons name={lists[listName].isPrivate ? "lock-closed-outline" : "lock-open-outline"} size={26} color="gray" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemoveList(listName)} style={styles.iconButton}>
                        <Ionicons name="remove-circle-outline" size={26} color="red" />
                      </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={50} color="#3A8D5B" />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  lockContainer: {
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 5,
  },
  iconContainer: {
    marginTop: 10,
  },
  titleContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    color: '#3A8D5B'
  },
  shelfcontainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 2,
    marginTop: 10,
    width: 300,
    borderRadius: 10,
    borderColor: '#3A8D5B',
    height: 500,
  },
  button: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#3A8D5B',
    borderRadius:10,
    height: 100,
  },
  addButton: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
  },
  listText: {
    fontSize: 18,
    marginTop: 10,
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
  iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
  iconButton: {
      marginTop: 10,
          paddingHorizontal: 10, // Adjust padding to bring icons closer together 
    },
  individualButton: {
    marginTop: 10,
  },
});