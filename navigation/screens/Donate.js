import React, { useState, useEffect, useRef } from 'react';

import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, NumberInput, ScrollView, Alert, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';




export default function DonateScreen({ navigation }) {
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();


  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, []); // The empty array will cause this effect to run only on mount


  const [modalVisible, setModalVisible] = useState(false);

  const onClose = () => setModalVisible(false);

  const [points, setPoints] = useState(0);
  const [bookPoints, setBookPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);



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
    setPoints(0);
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
    setPoints(0);
    setTotalPoints(0);

    books.length = 0;


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


  useEffect(() => {
    // This will be called after the state update has been applied
    console.log('Book Points:', bookPoints);
  }, [bookPoints]); // Only re-run the effect if bookPoints changes

  const addBook = () => {
    // ... your logic for adding a book
    const pontos = getRandomPoints(bookState);
    setBookPoints(pontos);
    setPoints(pontos);


    console.log('Points: ' + points);

    const newBook = {
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      bookState: bookState.trim(),
      date: date,
      city: selectedCity,
      store: selectedStore,
      points: pontos,


    };


    if (checkFields()) {
      setBooks([...books, newBook]);
      setTotalPoints(totalPoints + pontos);
      setModalVisible(true);
      reset();
    }

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

  const [summaryModalVisible, setSummaryModalVisible] = useState(false);


  const displayBooksSummary = () => {
    if (books.length === 0) {
      Alert.alert('No books', 'Please add at least one book.');
      return;
    }
    setSummaryModalVisible(true); // Show the summary modal
  };

  const RemoveBook = (index) => {
    const newBooks = books.filter((_, bookIndex) => bookIndex !== index);
    setBooks(newBooks);
    setTotalPoints(totalPoints - books[index].points);
  };


  return (
    <View style={styles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false} ref={scrollViewRef}>
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
            <Text style={styles.buttonText}>Add Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centeredcontainer}>
          {books.length > 0 ? (
            <TouchableOpacity style={styles.buttonContainer} onPress={displayBooksSummary}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>) : (
            <TouchableOpacity style={styles.buttonContainerInactive}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>)}


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

            <Text style={styles.modalTextPoints}>Your book has been added with <Text style={styles.points}>{bookPoints}</Text> Points
              <MaterialCommunityIcons name="leaf" size={20} color="green" />
            </Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={summaryModalVisible}
        onRequestClose={() => setSummaryModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewSubmit}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'darkgreen' }}>Sumary of books:</Text>
            <ScrollView>
              {books.map((book, index) => (
                <Text key={index} style={styles.modalText}>

                  <View style={{ flexDirection: 'row', fontSize: 20 }}>
                    <Text style={{ fontWeight: 'bold',fontSize: 20 }}>Book {index + 1}</Text>
                    <View style={{ alignItems: 'flex-end', marginLeft: 190}}>
                      <TouchableOpacity onPress={() => RemoveBook(index)}>
                        <MaterialCommunityIcons name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
  
                    
                  </View>
                  {'\n'}
                  - Title: {book.title}{'\n'}
                  - Author: {book.author}{'\n'}
                  - ISBN: {book.isbn}{'\n'}
                  - Book State: {book.bookState}{'\n'}
                  - City: {book.city}{'\n'}
                  - Store: {book.store}{'\n'}
                  - Date: {book.date.toDateString()}{'\n'}
                  <Text style={styles.modalTextPoints}>
                  - Points: <Text {...styles.points} >{book.points}</Text>
                  <MaterialCommunityIcons name="leaf" size={20} color="green" />
                  </Text>
                </Text>

              ))}
              <Text style={styles.modalTextTotal}>
                Total Points: {totalPoints}
                <MaterialCommunityIcons name="leaf" size={20} color="green" />
              </Text>
            </ScrollView>
            <View >
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSummaryModalVisible(false)}
              >
                <Text style={{fontSize: 18}}>Add More Books <MaterialCommunityIcons style={{marginTop}} size={22} name='plus-circle'></MaterialCommunityIcons></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  resetFieldsAndNavigate();
                  setSummaryModalVisible(false);
                }}
              >
                <Text style={{fontSize: 18}}>Confirm</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

    </View>

  );
};






const styles = StyleSheet.create({
  points: {

    color: 'darkgreen',
    fontWeight: 'bold',
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
    borderRadius: 35,
  },

  button: {
    backgroundColor: '#addfad', // Cor do fundo do botão
    paddingVertical: 10, // Espaçamento vertical dentro do botão
    paddingHorizontal: 20, // Espaçamento horizontal dentro do botão
    marginBottom: 20, // Espaço na parte inferior
    borderRadius: 20, // Bordas arredondadas
    marginHorizontal: 10, // Espaço entre os botões
    minWidth: 120, // Largura mínima para cada botão
    textAlign: 'center', // Centralizar texto
    alignItems: 'center', // Centralizar conteúdo
    fontSize: 20, // Tamanho da fonte
  },
  buttonText: {
    color: 'white', // Cor do texto
    textAlign: 'center', // Centralizar texto
    fontWeight: 'bold', // Negrito
    
    
  },
  buttonContainerInactive: {
    opacity: 0.3,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    paddingBottom: 10,
    paddingTop: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',


    borderColor: '#000',
    borderRadius: 35,


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
    fontSize: 20,
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
    fontSize: 20,

  },
  modalViewSubmit: {
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
    textAlign: 'left',
    letterSpacing: 0.75,
    lineHeight: 30,
  },
  modalTextPoints: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTextTotal: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'left',
    letterSpacing: 0.75,
    lineHeight: 30,
    fontWeight: 'bold',
    
  },

  lottieStyle: {
    width: 100,
    height: 100,
  }

});


