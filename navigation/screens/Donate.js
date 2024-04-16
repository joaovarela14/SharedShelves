import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // This needs to be installed
import { Picker } from '@react-native-picker/picker';



export default function DonateScreen({ navigation }) {

  
  const [selectedCity, setSelectedCity] = useState('lisboa');
  const [selectedStore, setSelectedStore] = useState('store1');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setISBN] = useState('');
  const [bookState, setBookState] = useState('new');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // Cidades de Portugal e lojas exemplo para cada cidade
  const cities = {
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
  
      return (
          <View style={styles.container}>
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
                
              <Text style={styles.label}>Book Title:</Text>
              <View style={styles.textBar}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setTitle}
                  value={title}
                  placeholder="Title"
                />
              </View>
              
              <Text style={styles.label}>Book Author:</Text>
              <View style={styles.textBar}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setAuthor}
                  value={author}
                  placeholder="Author"
                />
              </View>

              <Text style={styles.label}>Book ISBN:</Text>
              <View style={styles.textBar}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setISBN}
                  value={isbn}
                  placeholder="ISBN Code"
                />
              </View>
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add another book</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Choose Donation Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePicker}>
        <Text style={styles.dateText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>SEND</Text>
      </TouchableOpacity>

  
          </View>
      );
  };
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'top', // This will distribute the buttons evenly vertically
          backgroundColor: '#fff',
      },
      picker: {
          height: 50,
          width: 168
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
    },
    textBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
  });
  

