import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, NumberInput, ScrollView, Alert, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';


export default function DonateScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);

  const onClose = () => setModalVisible(false);

  const [points, setPoints] = useState(0);


  const [selectedCity, setSelectedCity] = useState('City');
  const [selectedStore, setSelectedStore] = useState('Store');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setISBN] = useState('');
  const [bookState, setBookState] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorAuthor, setErrorAuthor] = useState('');
  const [errorISBN, setErrorISBN] = useState('');
  const [errorBookState, setErrorBookState] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorStore, setErrorStore] = useState('');
  const [errorDate, setErrorDate] = useState('');

  const checkFields = () => {
    let hasError = false;

    setErrorTitle('');
    setErrorAuthor('');
    setErrorISBN('');
    setErrorBookState('');
    setErrorCity('');
    setErrorStore('');
    setErrorDate('');

    if (!title.trim()) {
      setErrorTitle("Please enter a title.");
      hasError = true;
    }
    if (!author.trim()) {
      setErrorAuthor("Please enter an author's name.");
      hasError = true;
    }
    if (!isbn.trim()) {
      setErrorISBN("Please enter an ISBN.");
      hasError = true;
    } else if (isNaN(isbn)) {
      setErrorISBN("ISBN must be a numeric value.");
      hasError = true;
    }
    if (!bookState.trim()) {
      setErrorBookState("Please specify the book state.");
      hasError = true;
    }
    if (selectedCity === 'City') {
      setErrorCity("Please select a city from the list.");
      hasError = true;
    }
    if (selectedStore === 'Store') {
      setErrorStore("Please select a store from the list.");
      hasError = true;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      setErrorDate("Please select a current or future date.");
      hasError = true;
    }

    if (hasError) {
      return false;
    }

    return true;


  };


  const reset = () => {
    setTitle('');
    setAuthor('');
    setISBN('');
    setBookState('');
    setDate(new Date());  // Resets date to current date
    setShowDatePicker(false);
    setSelectedCity('City');
    setSelectedStore('Store');
  };


  const resetFieldsAndNavigate = () => {
    // Reset all the fields
    setTitle('');
    setAuthor('');
    setISBN('');
    setBookState('');
    setDate(new Date());  // Resets date to current date
    setShowDatePicker(false);
    setSelectedCity('City');
    setSelectedStore('Store');

    setBooks([{
      title: '',
      author: '',
      isbn: '',
      bookState: '',
      date: new Date(),
      city: 'City',
      store: 'Store',
    }]);


    navigation.navigate('Book');
  };

  const cities = {
    'City': 'City', // Default value
    'Lisboa': 'Lisboa',
    'Porto': 'Porto',
    'Coimbra': 'Coimbra',
    'Braga': 'Braga',
    'Aveiro': 'Aveiro',
    'Faro': 'Faro',
    'Leiria': 'Leiria',
    'Setubal': 'Setúbal',
    'Viseu': 'Viseu',
    'Viana do Castelo': 'Viana do Castelo'
  };

  const stores = {
    'City': ['Store'], // Default value
    'Lisboa': ['Store', 'El Corte Inglés', 'Fnac', 'Leroy Merlin'],
    'Porto': ['Store', 'Via Catarina Shopping', 'Mercado Bom Sucesso', 'NorteShopping'],
    'Coimbra': ['Store', 'Alma Shopping', 'Forum Coimbra', 'Coimbra Retail Park'],
    'Braga': ['Store', 'Braga Parque', 'Minho Center', 'Nova Arcada'],
    'Aveiro': ['Store', 'Forum Aveiro', 'Glicínias Plaza', 'Aveiro Center'],
    'Faro': ['Store', 'Forum Algarve', 'Mar Shopping Algarve', 'IKEA Algarve'],
    'Leiria': ['Store', 'LeiriaShopping', 'Leiria Centro', 'Mar Shopping Leiria'],
    'Setubal': ['Store', 'Alegro Setúbal', 'Rio Sul Shopping', 'Forum Barreiro'],
    'Viseu': ['Store', 'Palácio do Gelo Shopping', 'Viseu Retail Park', 'Forum Viseu'],
    'Viana do Castelo': ['Store', 'Estação Viana Shopping', 'Viana Market', 'Space Viana Shopping']
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const ErrorMessage = ({ message }) => {
    return (
      <Text style={styles.errorText}>{message}</Text>
    );
  };

  const [books, setBooks] = useState([]);


  const addBook = () => {
    // First, construct the book object from your state variables
    const newBook = {
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      bookState: bookState.trim(),
      date: date,
      city: selectedCity,
      store: selectedStore,
    };


    if (checkFields()) {
      setBooks([...books, newBook]);
      setPoints(getRandomPoints(bookState));
      console.log(points);
      setModalVisible(true);
      reset();
    };
  };

  const askToAddAnotherBook = () => {
    // Display a dialog with Yes and No options
    Alert.alert(
      "Add Another Book",
      "Would you like to add another book?",
      [
        // The "No" button
        // Does nothing but dismiss the dialog when pressed
        {
          text: "No",
        },
        // The "Yes" button
        // Calls the addNewBook function when pressed
        {
          text: "Yes",
          onPress: () => addBook()
        }
      ],
      { cancelable: false } // Prevents the alert from being dismissed by tapping outside of the alert box
    );
  };

  function getRandomPoints(bookState) {
    let min, max;

    switch (bookState) {
      case 'new':
        min = 650;
        max = 1000;
        break;
      case 'barelynew':
        min = 400;
        max = 600;
        break;
      case 'used':
        min = 200;
        max = 400;
        break;
      default:
        min = 1; // Default minimum if no known state is provided
        max = 100; // Default maximum if no known state is provided
        break;
    }

    // Generate random points within the specified range
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const displayBooksSummary = () => {

    if (books.length === 0) {
      Alert.alert('No books', 'Please add at least one book.');
      return;
    }

    const bookDetails = books.map((book, index) =>
      `Book ${index + 1}:\n` +
      `- Title: ${book.title}\n` +
      `- Author: ${book.author}\n` +
      `- ISBN: ${book.isbn}\n` +
      `- Book State: ${book.bookState}\n` +
      `- City: ${book.city}\n` +
      `- Store: ${book.store}\n` +
      `- Date: ${book.date.toDateString()}\n`
    ).join('\n');

    Alert.alert("Books Summary", bookDetails);
  };


  return (
    <View style={styles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.headerText}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Donate Book</Text>
        </View>

        <View >
          <Text style={styles.informative} >Fill out the following parameters.
            Our team will analyze your book(s) to assign you a fair and considered point offer.
            This way, you won't have to wait for a lengthy and tedious evaluation when you go to donate your book(s). </Text>
        </View>

        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: 5, marginBottom: 20 }}>Select your city and store:</Text>

        <Picker
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedCity(itemValue);
            setSelectedStore(stores[itemValue][0]); // Reset store selection on city change
          }}>
          {Object.entries(cities).map(([key, value]) => (
            <Picker.Item key={key} label={value} value={key} />
          ))}
        </Picker>
        <Text style={{ color: 'red', fontSize: 14, flex: 1, marginBottom: 10, marginLeft: 20 }}>{errorCity}</Text>

        <Picker
          selectedValue={selectedStore}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedStore(itemValue)}>
          {stores[selectedCity].map((store, index) => (
            <Picker.Item key={index} label={store} value={store} />
          ))}
        </Picker>
        <ErrorMessage message={errorStore} />



        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: 5, marginBottom: 20 }}>Informations about the book:</Text>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.errorText}>{errorTitle}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Insert book title"
          value={title}
          onChangeText={setTitle}
        />


        <View style={styles.labelContainer}>
          <Text style={styles.label}>Author:</Text>
          <Text style={styles.errorText}>{errorAuthor}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Insert book author"
          value={author}
          onChangeText={setAuthor}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.label}>ISBN:</Text>
          <Text style={styles.errorText}>{errorISBN}</Text>
        </View>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          placeholder="Insert book ISBN"
          value={isbn}
          onChangeText={setISBN}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Book State:</Text>
          <Text style={styles.errorText}>{errorBookState}</Text>
        </View>
        <View style={styles.bookStateContainer}>
          <TouchableOpacity
            style={[
              styles.bookStateOption,
              bookState === 'new' ? styles.selected : {},
            ]}
            onPress={() => setBookState('new')}
          >
            <Text style={styles.bookStateText}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bookStateOption,
              bookState === 'barelynew' ? styles.selected : {},
            ]}
            onPress={() => setBookState('barelynew')}
          >
            <Text style={styles.bookStateText}>Barely New</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.bookStateOption,
              bookState === 'used' ? styles.selected : {},
            ]}
            onPress={() => setBookState('used')}
          >
            <Text style={styles.bookStateText}>Used</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.errorText}>{errorDate}</Text>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.textBar, { flex: 1, marginLeft: 15 }]} // Flex grow equally, margin for gap
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <MaterialCommunityIcons name="calendar" size={24} color="black" style={{ marginLeft: 10 }} />


          </TouchableOpacity>


        </View>

        <View style={styles.centeredcontainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={addBook}>
            <Text style={styles.buttonText}>Add Another Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centeredcontainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={displayBooksSummary}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>



        {showDatePicker && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              style={styles.dateTimePicker}
            />
          </View>)}

      </ScrollView>

      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your book has been added with <Text style={styles.underlineText}>{points}</Text> points.</Text>
            <LottieView
              source={require('../../assets/points.json')}
              autoPlay
              loop
              style={styles.lottieStyle}
            />
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

  );
};






const styles = StyleSheet.create({
  underlineText: {
    textDecorationLine: 'underline',
    // you can add other styling specific to the underlined text if needed
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    flex: 1,
    marginBottom: 10,
    marginLeft: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 95,

    padding: 30
  },
  picker: {
    backgroundColor: '#fff',
    height: 50,
    width: 200,
    marginLeft: 15,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 55,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,

  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    height: 40,
    marginLeft: 20,
    width: 300,
    borderRadius: 7,
  },
  inputLabel: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    marginTop: 5,
  },

  textBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10, marginRight: 60,
    marginBottom: 15,
  },
  bookStateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 25,
    marginBottom: 20,
  },
  bookStateOption: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  selected: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
  },
  bookStateText: {
    color: 'black',
  },

  dateText: {
    color: '#000',
    fontSize: 18,
    textDecorationLine: 'underline',
  },

  dateTimePicker: {
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 5,
  },

  buttonContainer: {

    backgroundColor: '#addfad',
    borderColor: 'black',
    paddingBottom: 10,
    paddingTop: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.75,
    shadowRadius: 15,
    borderColor: '#000',

  },
  centeredcontainer: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#000', // Text color
    justifyContent: 'center',
    alignItems: 'center',
  },
  informative: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,

    color: 'gray',
    textAlign: 'justify',

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },

  lottieStyle: {
    width: 100,
    height: 100,
  }

});


