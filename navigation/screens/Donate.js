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


  const checkFields = () => {
    const details = `Title: ${title}\nAuthor: ${author}\nISBN: ${isbn}\nBook State: ${bookState}\nDate: ${date.toDateString()}`;
    if (!title.trim()) {
      Alert.alert("Validation Error", "Please enter a title.");
      return; // Stop further execution to focus on one error at a time
    }
    if (!author.trim()) {
      Alert.alert("Validation Error", "Please enter an author's name.");
      return; // Stop further execution to focus on one error at a time
    }
    if (!isbn.trim()) {
      Alert.alert("Validation Error", "Please enter an ISBN.");
      return; // Stop further execution to focus on one error at a time
    }
    if (isNaN(isbn)) {
      Alert.alert("Validation Error", "ISBN must be a numeric value.");
      return; // Stop further execution to focus on one error at a time
    }
    if (!bookState.trim()) {
      Alert.alert("Validation Error", "Please specify the book state.");
      return; // Stop further execution to focus on one error at a time
    }
    if (selectedCity === 'city') {
      Alert.alert("Validation Error", "Please select a city from the list.");
      return; // Stop further execution to focus on one error at a time
    }
    if (selectedStore === 'Store') {
      Alert.alert("Validation Error", "Please select a store from the list.");
      return; // Stop further execution to focus on one error at a time
    
    } else {
      // If all validations pass
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

    // Navigate to the Book page
    navigation.navigate('Book');  // Ensure 'Book' is the correct name of the route you want to navigate to
  };
  // Cidades de Portugal e lojas exemplo para cada cidade
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
      'lisboa': ['Loja A', 'Loja B', 'Loja C'],
      'porto': ['Loja D', 'Loja E'],
      'coimbra': ['Loja F', 'Loja G', 'Loja H'],
      'braga': ['Loja I', 'Loja J'],
      'aveiro': ['Loja K', 'Loja L'],
      'faro': ['Loja M', 'Loja N'],
      'leiria': ['Loja O', 'Loja P'],
      'setubal': ['Loja Q', 'Loja R'],
      'viseu': ['Loja S', 'Loja T'],
      'viana-do-castelo': ['Loja U', 'Loja V']
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  
      return (
          <View style={styles.container}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <View style={styles.headerText}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5, textDecorationLine: 'underline', marginBottom:20 }}>Donate Book</Text>
              </View>

              <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: 5, marginBottom: 20 }}>Select your city and store:</Text>
              <Picker
                  selectedValue={selectedCity}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => {
                      setSelectedCity(itemValue);
                      setSelectedStore(stores[itemValue][0]); // Reset store selection on city change
                  }}>
                  {Object.entries(cities).map(([key, value]) => (
                      <Picker.Item key={key} label={value} value={key} />
                  ))}
              </Picker>
  
              <Picker
                  selectedValue={selectedStore}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedStore(itemValue)}>
                  {stores[selectedCity].map((store, index) => (
                      <Picker.Item key={index} label={store} value={store} />
                  ))}
              </Picker>

              <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: 5, marginBottom: 20 }}>Informations about the book:</Text>

                <Text style={styles.label}>Title:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Insert book title"
                  value={title}
                  onChangeText={setTitle}
                />



                <Text style={styles.label}>Author:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Insert book author"
                  value={author}
                  onChangeText={setAuthor}
                />

                <Text style={styles.label}>ISBN:</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.input}
                  placeholder="Insert book ISBN"
                  value={isbn}
                  onChangeText={setISBN}
                />

                <Text style={styles.label}>Book State:</Text>
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

                <Text style={styles.label}>Date:</Text>
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
      container: {
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#fff',
          paddingBottom:95
      },
      picker: {
          height: 50,
          width: 168
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

    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 10
    },
    input: {
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
      backgroundColor: 'green', // Change this color to match your app's theme
      borderColor: 'blue',
    },
    bookStateText: {
      color: 'black', // Text color for selected state
    },

    dateText: {
      color: '#000', // Dark grey text color
      fontSize: 18,
      textDecorationLine: 'underline',
    },
    pickerContainer: {
      borderRadius: 8,
      overflow: 'hidden', 
      elevation: 10,
      shadowColor: '#000', // Shadow for 3D effect
      borderRadius: 5,
      padding: 10,

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
  });
  

