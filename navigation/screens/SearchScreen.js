import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); // Novo estado para armazenar o histórico de buscas

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter something to search.');
      return;
    }
    console.log("Search query:", searchQuery);
    setSearchHistory(prevHistory => [...prevHistory, searchQuery]);
    setSearchQuery('');
  };

  const clearSearchHistory = () => {
    setSearchHistory([]); // Limpa todo o histórico de buscas
  };

  const removeSearchItem = index => {
    setSearchHistory(prevHistory => prevHistory.filter((item, idx) => idx !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>SEARCH</Text> 

      <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, marginTop: 20 }}>
        <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search title or author"
          style={{
            width: 200, 
            fontSize: 14,
            paddingVertical: 5,
          }}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: 'blue',
            padding: 8,
            borderRadius: 5,
            marginLeft: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 14 }}>Enter</Text>
        </TouchableOpacity>

      </View>



      <View style={{flexDirection: 'row'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Recent</Text> 
        <TouchableOpacity onPress={clearSearchHistory} style={styles.button}>
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.historyContainer}>
        {searchHistory.map((query, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.queryText}>{query}</Text>
            <TouchableOpacity onPress={() => removeSearchItem(index)} style={styles.deleteButton}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Latest Search</Text>
        {searchHistory.length > 0 && (
          <Text style={styles.latestSearch}>{searchHistory[searchHistory.length - 1]}</Text>
        )}
      </View>
      
    </View>

  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      

      padding: 30,
      marginTop: 30,
    },
    input: {
      width: '100%',
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      alignItems: 'flex-end'
    },
    
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    historyContainer: {
      marginTop: 20,
      width: '100%',
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    queryText: {
      fontSize: 16,
    },
    deleteButton: {
      marginLeft: 10,
    }
  });



  

