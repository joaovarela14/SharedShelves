import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); // Novo estado para armazenar o histórico de buscas
  const topBooks = [
    { source: require('../../assets/harrypotterbook.jpg') },
    { source: require('../../assets/portatrancada.jpeg') },
    { source: require('../../assets/stephenking.jpg') },
    { source: require('../../assets/acriada.jpeg') },
  ];

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
    // SEARCH SCREEN
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
          style={styles.button}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>

      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10,}}>Recent</Text> 
        <TouchableOpacity onPress={clearSearchHistory} style={styles.buttonclear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {searchHistory.slice(0, 5).map((search, index) => (
          <TouchableOpacity key={index} onPress={() => removeSearchItem(index)} style={styles.recentSearchItem}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.recentSearchText}>{search}</Text>
              <Ionicons name="close-circle" size={24} color="red" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Latest Search</Text>
        {searchHistory.length > 0 && (
          <View style={styles.card}>
            <Image 
              source={require('../../assets/SharedShelves.png')}style={styles.image}
            />
            <Text style={styles.cardText}>{searchHistory[searchHistory.length - 1]}</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Top Book Search</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
        {topBooks.map((book, index) => (
          <View key={index} style={styles.bookCard}>
            <Image source={book.source} style={styles.bookCover} />
          </View>
        ))}
        </ScrollView>
      
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
      fontSize: 16,
      backgroundColor: '#3A8D5B',
      padding: 8,
      borderRadius: 5,
      marginLeft: 37,
    },

    buttonclear: {
      backgroundColor: 'red',
      padding: 8,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 205,
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
    },

    //RECENT SEARCH
    recentSearchItem: {
      margin: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#ECE5DF',
      borderRadius: 20,
      justifyContent: 'center',
      height: 40,
      
    },

    recentSearchText: {
      fontSize: 18,
      marginRight: 10,
    },
    
    //LATEST SEARCH
    card: {
      flexDirection: 'row', // Alinha a imagem e o texto horizontalmente
      alignItems: 'center', // Centraliza verticalmente os itens dentro do card
      backgroundColor: '#fff', // Cor de fundo do card
      borderRadius: 8, // Bordas arredondadas
      padding: 10, // Espaçamento interno do card
      shadowColor: '#000', // Sombra
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 10, // Espaçamento acima do card
    },
    image: {
      width: 45, // Largura adaptada para uma capa de livro
      height: 60, // Altura maior para formato de livro
      marginRight: 10, // Espaçamento à direita da imagem
    },
    cardText: {
      fontSize: 18, // Tamanho do texto
      fontWeight: 'bold', // Negrito
      flex: 1, // Ocupa o espaço restante no card
    },

    //TOP BOOK SEARCH
    sectionTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    scrollViewContainer: {
      flexDirection: 'row',
    },
    bookCard: {
      backgroundColor: '#fff',
      marginRight: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      width: 107, // Largura do card, ajuste conforme necessário
      height: 170, // Altura do card, ajuste conforme necessário
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookCover: {
      width: '100%',
      height: '100%', // Ajuste para 80% da altura do card para deixar espaço para o título
    },

  });



  

