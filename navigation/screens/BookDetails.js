import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, ToastAndroid, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Clipboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useGlobalState } from './GlobalContext';
import booksData from '../../books.json';

import SearchScreen from './SearchScreen';

const index = SearchScreen.bookindex;
const Stack = createStackNavigator();

export default function BookDetails({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Details"
        component={BookDetailsContent}
        options={({ navigation }) => ({
          headerTitle: 'Book Details',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function BookDetailsContent({ route, navigation }) {
  const { selectedBookIndex, lists, addBookToList, removeBookFromList } = useGlobalState();
  const book = booksData[selectedBookIndex];
  const [listModalVisible, setListModalVisible] = useState(false);
  const [isInAnyList, setIsInAnyList] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString('CODESHSH5');
    setIsCopied(true);
    ToastAndroid.show('Copied to your clipboard', ToastAndroid.SHORT);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const imageMap = {
    'fnacLogo': require('../../assets/fnac.png'),
    'bertrandLogo': require('../../assets/bertrand.png'),
    'wookLogo': require('../../assets/wook.jpg'),
    'acriada': require('../../assets/acriada.jpeg'),
    'harrypotterbook': require('../../assets/harrypotterbook.jpg'),
    'portatrancada': require('../../assets/portatrancada.jpeg'),
    'stephenking': require('../../assets/stephenking.jpg'),
    'prideprejudicecover': require('../../assets/prideprejudice.jpeg'),
  };

  const defaultCover = require('../../assets/defaultcover.jpeg');
  const { bookCover } = useGlobalState();

  const getImageForBook = (coverKey) => {
    const keys = Object.keys(bookCover);
    if (bookCover[coverKey]) {
      return bookCover[coverKey];
    }
    const size = keys.length;
    const index = Math.floor(Math.random() * size);
    const randomKey = keys[index];
    return bookCover[randomKey] || defaultCover;
  };

  const coverImage = getImageForBook(book.cover);

  const storeLogos = book.stores
    .map(store => ({
      ...store,
      logo: imageMap[store.logo]
    }))
    .sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')));

  const openURL = (url) => {
    Linking.openURL(url).catch(err => {
      console.error("Failed to open URL:", err);
      alert('Não foi possível abrir o site.');
    });
  };

  useEffect(() => {
    const isBookInAnyList = Object.values(lists).some(list => list.items.includes(selectedBookIndex));
    setIsInAnyList(isBookInAnyList);
  }, [lists, selectedBookIndex]);

  const handleAddBookToList = (listName) => {
    addBookToList(listName, selectedBookIndex);
    setListModalVisible(false);
    setIsInAnyList(true);
    ToastAndroid.show(`Added to ${listName}!`, ToastAndroid.SHORT);
  };

  const handleRemoveBookFromLists = () => {
    Object.keys(lists).forEach(listName => {
      if (lists[listName].items.includes(selectedBookIndex)) {
        removeBookFromList(listName, selectedBookIndex);
      }
    });
    setIsInAnyList(false);
    ToastAndroid.show('Removed from all lists!', ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookHeader}>
        <Image source={getImageForBook(book.cover)} style={styles.bookCover} />

        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.bookRating}>{`${book.rating} ★`}</Text>
            <TouchableOpacity
              onPress={() => {
                if (isInAnyList) {
                  handleRemoveBookFromLists();
                } else {
                  setListModalVisible(true);
                }
              }}
              style={{ marginLeft: 15, marginTop: 2 }}
            >
              <Ionicons name={isInAnyList ? 'heart' : 'heart-outline'} size={24} color="red" />
            </TouchableOpacity>
          </View>
          <Text style={styles.bookGenres}>{book.genres.join(' / ')}</Text>
          <TouchableOpacity onPress={() => setDescriptionExpanded(!descriptionExpanded)}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderText}>Description</Text>
              <Ionicons
                name={descriptionExpanded ? 'arrow-up-outline' : 'arrow-down-outline'}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {descriptionExpanded && <Text style={styles.bookDescription}>{book.description}</Text>}

      <Text style={styles.discountCodeText}> Promo Code 5%</Text>

      <View style={styles.discountAndBuyContainer}>
        <View style={styles.buyFromContainer}>
          <Text style={styles.buyFromText}>Buy from...</Text>
        </View>

        <View style={styles.discountCodeContainer}>
          <TouchableOpacity onPress={copyToClipboard}>
            <View style={styles.dropdownHeader}>
              <MaterialIcons name="discount" size={16} color="black" />
              <Text style={styles.discountCodeText}> CODESHSH5</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isCopied && <Text style={{ textAlign: 'right' }}>Copied to your clipboard</Text>}

      <View style={styles.storeButtonsContainer}>
        {book.stores
          .slice()
          .sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')))
          .map((store, index) => (
            <View key={index} style={styles.storeButtonCard}>
              <TouchableOpacity style={styles.storeButton} >
                <Image source={storeLogos[index].logo} style={styles.image} />
                <Text style={styles.storeButtonText}>{store.name}</Text>
                <Text style={styles.storeButtonPrice}>{store.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>

      <View style={styles.getPointsContainer}>
        <TouchableOpacity
          style={styles.getPointsButton}
          onPress={() => navigation.navigate('GetScreen')}
        >
          <Text style={styles.getPointsButtonText}>Get with Points</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={listModalVisible}
        onRequestClose={() => setListModalVisible(!listModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add to List</Text>
            {Object.keys(lists).map((listName, index) => (
              <View key={index} style={styles.listCard}>
                <TouchableOpacity
                  style={styles.listButton}
                  onPress={() => handleAddBookToList(listName)}
                >
                  <Text style={styles.listText}>{listName}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setListModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookHeader: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  bookCover: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    marginRight: 20,
  },
  bookInfo: {
    justifyContent: 'space-around',
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 18,
    color: 'grey',
  },
  bookRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookGenres: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  bookDescription: {
    fontSize: 16,
    color: 'grey',
  },
  storeButtonsContainer: {
    marginTop: 4,
  },
  storeButtonCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    width: '98%',
    marginLeft: 5,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  storeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  storeButtonPrice: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 40,
    height: 40,
  },
  getPointsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  getPointsButton: {
    padding: 15,
    backgroundColor: '#3A8D5B',
    borderRadius: 10,
  },
  getPointsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Ensure the modal is not excessively wide on larger screens
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#3A8D5B',
    marginBottom: 15,
    borderBottomWidth:0.8,
    borderBottomColor:'#3A8D5B',
  },
  listCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  listButton: {
    flex: 1,
    alignItems: 'center',
  },
  listText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountAndBuyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountCodeContainer: {
    backgroundColor: '#B6D3B7',
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  discountCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  buyFromText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
