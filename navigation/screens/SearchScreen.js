import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, 
StyleSheet, Image, ScrollView, FlatList, Modal  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons
import { useGlobalState } from './GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import booksData from '../../books.json'; 

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); // Novo estado para armazenar o histórico de buscas
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef();

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
    console.log('Keywords:', keywords);

    // Filtrar os dados dos livros para encontrar correspondências
    const results = booksData.filter(book =>
      keywords.some(keyword => {
        return keyword !== '' && ( // Certifique-se de que a palavra-chave não está vazia antes de comparar
          book.title.toLowerCase().includes(keyword) ||
          book.author.toLowerCase().includes(keyword) ||
          (book.genres && book.genres.some(genre => genre.toLowerCase().includes(keyword)))
        );
      })
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

  const { totalPoints, addPoints } = useGlobalState();


  return (
    // SEARCH SCREEN
    <View style={styles.container}>
    <ScrollView vertical showsVerticalScrollIndicator={false} ref={scrollViewRef}>

      <View style={{ flexDirection: 'row', fontSize: 25, fontWeight: 'bold', justifyContent: 'space-between'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>SEARCH</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 110, color: 'darkgreen'}}>{totalPoints} 
          <MaterialCommunityIcons name="leaf" size={20} color="green" />
        </Text>
      </View>
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
      

      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10,}}>Recent</Text> 
        <TouchableOpacity onPress={clearSearchHistory} style={styles.buttonclear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {
        searchHistory.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {searchHistory.slice(0, 5).map((search, index) => (
              <View key={index} style={styles.recentSearchItem}>
                <Text style={styles.recentSearchText}>{search}</Text>
                <TouchableOpacity onPress={() => removeSearchItem(index)}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noRecentSearchText}>No Recent Search Books</Text>
        )
      }


      <View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Latest Search</Text>
        {searchHistory.length > 0 ? (
          <View style={styles.card}>
            <Image 
              source={require('../../assets/SharedShelves.png')}style={styles.image}
            />
            <Text style={styles.cardText}>{searchHistory[searchHistory.length - 1]}</Text>
          </View>
        ) : (
          <Text style={styles.noResultsText}>No Previous Search</Text>
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
      
        <View>
          <Text style={styles.genreHeader}>Explore Popular Genres</Text>
          <View style={styles.genreList}>
            <TouchableOpacity style={styles.genreItem}>
              <Text style={styles.genreText}>Classics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.genreItem}>
              <Text style={styles.genreText}>Romance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.genreItem}>
              <Text style={styles.genreText}>Fantasy</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.genreList}>
            <TouchableOpacity style={styles.genreItem}>
                <Text style={styles.genreText}>Mystery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genreItem}>
                <Text style={styles.genreText}>Horror</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genreItem}>
                <Text style={styles.genreText}>Science Fiction</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.genreList}>
            <TouchableOpacity style={styles.genreItem}>
                <Text style={styles.genreText}>Mystery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genreItem}>
                <Text style={styles.genreText}>Horror</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genreItem}>
                <Text style={styles.genreText}>Science Fiction</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.genreHeader}> 
            <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>EXPLORE ALL GENRES</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View> //VIEW DO CONTAINER TODO


  );
};

  const styles = StyleSheet.create({
    container: {
      padding: 30,
      marginTop: 30,
      paddingBottom: 75,
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
      backgroundColor: 'grey',
      padding: 8,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
      alignItems: 'flex-end'
    },
    
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      justifyContent: 'space-between'
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
      flexDirection: 'row',
      
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
      marginBottom: 10, // Espaçamento abaixo do card
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
      width: 117, // Largura do card, ajuste conforme necessário
      height: 190, // Altura do card, ajuste conforme necessário
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

    noRecentSearchText: {
      fontSize: 16,
      color: 'grey',
      textAlign: 'center',
      marginBottom: 15,
    },

    noResultsText: {
      fontSize: 16,
      color: 'grey',
      textAlign: 'center',
      marginBottom: 15,
    },

    genreHeader: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    genreList: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 10,
    },
    genreItem: {
      backgroundColor: '#ccc', // Substitua pela cor de fundo desejada ou imagem
      padding: 10,
      borderRadius: 5,
    },
    genreText: {
      color: 'white', // Substitua pela cor do texto desejada
    },
    exploreButton: {
      backgroundColor: 'blue', // Substitua pela cor de fundo do botão "Explorar todos"
      padding: 10,
      borderRadius: 5,
    },
    exploreButtonText: {
      color: 'white', // Substitua pela cor do texto do botão "Explorar todos"
      fontWeight: 'bold',
    },
  });