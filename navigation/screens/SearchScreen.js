import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, 
StyleSheet, Image, ScrollView, FlatList, Modal  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons
import { useGlobalState } from './GlobalContext';

import booksData from '../../books.json'; 

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); // Novo estado para armazenar o histórico de buscas
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const topBooks = [
    { source: require('../../assets/harrypotterbook.jpg') },
    { source: require('../../assets/portatrancada.jpeg') },
    { source: require('../../assets/stephenking.jpg') },
    { source: require('../../assets/acriada.jpeg') },
  ];

  //METER NO GLOBAL CONTEXT PARA USAR NO SEARCH E NO DETAILS  
  const imageMap = {
    'fnacLogo': require('../../assets/fnac.png'),
    'bertrandLogo': require('../../assets/bertrand.png'),
    'wookLogo': require('../../assets/wook.jpg'),
    'acriada': require('../../assets/acriada.jpeg'),
    'harrypotterbook': require('../../assets/harrypotterbook.jpg'),
    'portatrancada': require('../../assets/portatrancada.jpeg'),
    'stephenking': require('../../assets/stephenking.jpg'),
    // Add other images as needed
  };


  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter something to search.');
      return;
    }
    console.log("Search query:", searchQuery);
    setSearchHistory(prevHistory => [...prevHistory, searchQuery]);

    // Divida a string de pesquisa em palavras-chave
    const keywords = searchQuery.toLowerCase().split(' ');

    // Filtrar os dados dos livros para encontrar correspondências
    const results = booksData.filter(book =>
      keywords.some(keyword =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        (book.genres && book.genres.some(genre => genre.toLowerCase().includes(keyword)))
      )
    );
    console.log('Search results:', results);

    setSearchResults(results); // Atualiza o estado com os resultados da pesquisa
    setSearchQuery(''); // Limpa a pesquisa atual
    setModalVisible(true); // Exibe o modal com os resultados
  };

  const clearSearchHistory = () => {
    setSearchHistory([]); // Limpa todo o histórico de buscas
  };

  const removeSearchItem = index => {
    setSearchHistory(prevHistory => prevHistory.filter((item, idx) => idx !== index));
  };

  const { setSelectedBookIndex } = useGlobalState();

  const closeModal = () => {
    setModalVisible(false);
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    closeModal();
                    setSelectedBookIndex(item.id);
                    navigation.navigate('BookDetails');
                    console.log('Selected book:', item);

                  }}
                  style={styles.modalItem}
                >
                  <Image source={imageMap[item.cover]} style={styles.modalImage} />
                  <View style={styles.modalTextContainer}>
                    <Text style={styles.modalTitle}>{item.title}</Text>
                    <Text style={styles.modalAuthor}>{item.author}</Text>
                    <Text style={styles.modalGenres}>{item.genres.join(', ')}</Text>
                    <Text style={styles.modalRating}>{item.rating} ★</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.sectionTitle}>Top Book Search</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
          
        {topBooks.map((book, index) => (
        <TouchableOpacity
          key={index} // A propriedade key deve ser aqui
          onPress={() => {
            setSelectedBookIndex(index);
            navigation.navigate('BookDetails');
          }}
          style={styles.touchableArea}
        >
          <View style={styles.bookCard}>
            <Image source={book.source} style={styles.bookCover} />
          </View>
        </TouchableOpacity>
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

    //MODAL
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalItem: {
      flexDirection: 'row',
      marginBottom: 15,
      width: 300,
    },
    modalImage: {
      width: 100,
      height: 150,
      resizeMode: 'cover',
      marginRight: 10,
    },
    modalTextContainer: {
      justifyContent: 'space-around',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalAuthor: {
      fontSize: 14,
      color: 'grey',
    },
    modalGenres: {
      fontSize: 14,
    },
    modalRating: {
      fontSize: 14,
    },
    closeButton: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      elevation: 2,
    },
  });



  

