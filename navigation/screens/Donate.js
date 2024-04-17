import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, NumberInput,ScrollView, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



export default function DonateScreen({ navigation }) {

  
  const [selectedCity, setSelectedCity] = useState('city');
  const [selectedStore, setSelectedStore] = useState('store');

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
    const details = `Title: ${title}\nAuthor: ${author}\nISBN: ${isbn}\nBook State: ${bookState}\nDate: ${date.toDateString()}`;
    let hasError = false;
    // Resetar mensagens de erro
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
    if (selectedCity === 'city') {
      setErrorCity("Please select a city from the list.");
      hasError = true;
    }
    if (selectedStore === 'Store') {
      setErrorStore("Please select a store from the list.");
      hasError = true;
    }
    if (date < new Date()) {
      setErrorDate("Please select a valid date.");
      hasError = true;
    }

    if (!hasError) {      // If all validations pass
      Alert.alert("Your book is going to be analyzed by our team. Thank you!", details,
        [
          { text: "OK", onPress: () => resetFieldsAndNavigate() }
        ]
      );
    }
  };
  

  const resetFieldsAndNavigate = () => {
    // Reset all the fields
    setTitle('');
    setAuthor('');
    setISBN('');
    setBookState('');
    setDate(new Date());  // Resets date to current date
    setShowDatePicker(false);
    setSelectedCity('city');
    setSelectedStore('store');


    navigation.navigate('Book'); 
  };

  const cities = {
      'city': 'City', // Default value
      'lisboa': 'Lisboa',
      'porto': 'Porto',
      'coimbra': 'Coimbra',
      'braga': 'Braga',
      'aveiro': 'Aveiro',
      'faro': 'Faro',
      'leiria': 'Leiria',
      'setubal': 'Setúbal',
      'viseu': 'Viseu',
      'viana-do-castelo': 'Viana do Castelo'
  };

  const stores = {
      'city': ['Store'], // Default value
      'lisboa': ['Store', 'El Corte Inglés', 'Fnac', 'Leroy Merlin'],
      'porto': ['Store', 'Via Catarina Shopping', 'Mercado Bom Sucesso', 'NorteShopping'],
      'coimbra': ['Store', 'Alma Shopping', 'Forum Coimbra', 'Coimbra Retail Park'],
      'braga': ['Store', 'Braga Parque', 'Minho Center', 'Nova Arcada'],
      'aveiro': ['Store', 'Forum Aveiro', 'Glicínias Plaza', 'Aveiro Center'],
      'faro': ['Store', 'Forum Algarve', 'Mar Shopping Algarve', 'IKEA Algarve'],
      'leiria': ['Store', 'LeiriaShopping', 'Leiria Centro', 'Mar Shopping Leiria'],
      'setubal': ['Store', 'Alegro Setúbal', 'Rio Sul Shopping', 'Forum Barreiro'],
      'viseu': ['Store', 'Palácio do Gelo Shopping', 'Viseu Retail Park', 'Forum Viseu'],
      'viana-do-castelo': ['Store', 'Estação Viana Shopping', 'Viana Market', 'Space Viana Shopping']

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
      return (
          <View style={styles.container}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <View style={styles.headerText}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5, textDecorationLine: 'underline' }}>Donate Book</Text>
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
              <Text style={{color: 'red',fontSize: 14,flex:1, marginBottom:10, marginLeft:20}}>{errorCity}</Text>

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
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { checkFields(); }}>

                      <Text style={styles.buttonText}>SEND</Text>
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
          </View>
          
      );
  };
  
  const styles = StyleSheet.create({
      errorText: {
        color: 'red',
        fontSize: 14,
        flex:1, 
        marginBottom:10,
        marginLeft:20
      },
      container: {
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#fff',
          paddingBottom:95
      },
      picker: {
        backgroundColor: '#fff',
        height: 50,
        width: 200,
        marginLeft: 15,
        borderColor: 'black',
        borderWidth: 5,  // You need to specify borderWidth to show the border color
        borderRadius: 55, // Correct property for rounding corners
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Specifies the shadow's offset
        shadowOpacity: 0.5, // How transparent the shadow is
        shadowRadius: 3,  // The blur radius of the shadow
        elevation: 4, // This is necessary for Android to show shadow

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
      flex:1,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
      height: 40,
      marginLeft: 20,
      width: 350,
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
      padding: 10,      marginRight: 60,
      marginBottom: 15,
    },
    bookStateContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: 25,
      marginBottom : 20,
    },
    bookStateOption: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      borderRadius: 4,
      marginRight: 10,
    },
    selected: {
      backgroundColor: 'lightgray', // Change this color to match your app's theme
      borderColor: 'black',
    },
    bookStateText: {
      color: 'black', // Text color for selected state
    },

    dateText: {
      color: '#000', // Dark grey text color
      fontSize: 18,
      textDecorationLine: 'underline',
    },

    dateTimePicker: {
      elevation: 10,
      shadowColor: '#000', // Shadow for 3D effect
      borderRadius: 5,
    },

    buttonContainer: {

      backgroundColor: 'lightblue',
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

  });
  
