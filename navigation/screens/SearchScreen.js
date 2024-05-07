import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Alert,
  StyleSheet, Image, ScrollView, FlatList, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons
import { useGlobalState } from './GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import booksData from '../../books.json';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); // Novo estado para armazenar o histórico de buscas
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const scrollViewRef = useRef();
  const [results, setResults] = useState([]);

  const topBooks = [
    { source: require('../../assets/harrypotterbook.jpg') },
    { source: require('../../assets/portatrancada.jpeg') },
    { source: require('../../assets/stephenking.jpg') },
    { source: require('../../assets/acriada.jpeg') },
    { source: require('../../assets/behindthenet.jpg') },
    { source: require('../../assets/1984.jpg') },
    { source: require('../../assets/itendswithus.jpg') },
    { source: require('../../assets/thehousemaidsecret.jpg') },
    { source: require('../../assets/thehousemaidiswatching.jpeg') },
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

  const bookCover = {
    'acriada': require('../../assets/acriada.jpeg'),
    'harrypotterbook': require('../../assets/harrypotterbook.jpg'),
    'portatrancada': require('../../assets/portatrancada.jpeg'),
    'stephenking': require('../../assets/stephenking.jpg'),
    'behindthenet': require('../../assets/behindthenet.jpg'),
    '1984': require('../../assets/1984.jpg'),
    'itendswithus': require('../../assets/itendswithus.jpg'),
    'thehousemaidsecret': require('../../assets/thehousemaidsecret.jpg'),
    'thehousemaidiswatching': require('../../assets/thehousemaidiswatching.jpeg'),

  };

  const defaultCover = require('../../assets/defaultcover.jpeg');

  const getImageForBook = (coverKey) => {
    const keys = Object.keys(bookCover);
    const size = keys.length;
    const index = Math.floor(Math.random() * size);
    const randomKey = keys[index];
    return bookCover[coverKey] || bookCover[randomKey];
  };

  const coverImage = getImageForBook(searchResults.cover);
  console.log('Cover Image:', coverImage);

  const handleSearch = () => {

    console.log("Search query:", searchQuery);

    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter something to search.');
      return;
    }
    setSearchHistory(prevHistory => {
      // Verifica se o searchQuery já existe no array prevHistory
      if (!prevHistory.includes(searchQuery)) {
        // Se não existir, adiciona searchQuery ao array
        return [...prevHistory, searchQuery];
      }
      // Se já existir, retorna o array original sem alterações
      return prevHistory;
    });

    const searchQueryNormalized = searchQuery.toLowerCase().trim();
    const keywords = searchQueryNormalized.split(' ');

    let tempResults = [];
    let additionalResults = [];

    // Buscar por correspondência exata de título
    const titleMatch = booksData.find(book =>
      book.title.toLowerCase() === searchQueryNormalized
    );

    if (titleMatch) {
      console.log('Title match:', titleMatch);
      tempResults.push(titleMatch);

      additionalResults = booksData.filter(book =>
        book.author === titleMatch.author && book.title.toLowerCase() !== searchQueryNormalized
      );
      tempResults = tempResults.concat(additionalResults);
    }

    // Se não houver correspondência de título, ou para adicionar mais resultados de autor e gênero
    const moreResults = booksData.filter(book =>
      !tempResults.includes(book) && (
        keywords.some(keyword => keyword !== '' && keyword.length > 1 && (
          book.author.toLowerCase().includes(keyword) ||
          (book.genres && book.genres.some(genre => genre.toLowerCase().includes(keyword))) ||
          book.title.toLowerCase().includes(keyword)
        ))
      )
    );

    // Adicionar os resultados adicionais dos autores e generos ao final da lista
    tempResults = tempResults.concat(moreResults);
    setResults(tempResults);
    console.log('Results:', results);

    setSearchResults(tempResults); // Atualiza o estado com os resultados da pesquisa
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

  const handleGenrePress = (genre) => {
    // Filtrar os livros que contêm o gênero especificado
    const filteredBooks = booksData.filter(book =>
      book.genres.includes(genre)
    );
    console.log('Filtered books:', filteredBooks);
  };

  const openModalWithGenre = (genre) => {
    let filteredBooks;

    if (genre.toLowerCase() === 'any') {
      // Filtra todos os livros e ordena por gênero
      filteredBooks = booksData.sort((a, b) => {
        // Supondo que todos os livros têm ao menos um gênero e que o primeiro gênero é o principal
        return a.genres[0].localeCompare(b.genres[0]);
      });
    } else {
      // Filtra livros que incluem o gênero específico
      filteredBooks = booksData.filter(book => book.genres.includes(genre));
    }
  
    setModalData(filteredBooks);
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [title, setTitle] = useState('');

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = booksData.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      (book.genres && book.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase())))

    );

    setSuggestions(filteredSuggestions);
    setTitle(query);
    setShowSuggestions(true);
  };

  return (
    // SEARCH SCREEN
    <View style={styles.container}>

      <ScrollView vertical showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <TouchableOpacity
          activeOpacity={1} // Mantém a aparência normal do componente sem alterar a opacidade ao tocar
          style={{ flex: 1 }} // Ajuste o estilo conforme necessário
          onPress={() => setShowSuggestions(false)} // Esconde as sugestões ao tocar fora
        >
          <View style={{ flexDirection: 'row', fontSize: 25, fontWeight: 'bold', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>SEARCH</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 120, color: 'darkgreen' }}>{totalPoints}
              <MaterialCommunityIcons name="leaf" size={20} color="green" />
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, marginTop: 20, zIndex: 1 }}>
            <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Search title or author"
              style={{
                width: 210,
                fontSize: 14,
                paddingVertical: 5,
              }}
              value={searchQuery}
              onChangeText={updateSearchQuery}
            />
            {showSuggestions && (
              <View style={styles.suggestionsContainer}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => {
                      setSearchQuery(suggestion.title);
                      setShowSuggestions(false);
                      setTitle(suggestion.title);
                    }}
                  >
                    <Text>{suggestion.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.button}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>

          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10, zIndex: 0 }}>Recent</Text>
            <TouchableOpacity onPress={clearSearchHistory} style={styles.buttonclear}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {
            searchHistory.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {searchHistory.slice(0, 5).map((search, index) => (
                  <View key={index} style={styles.recentSearchItem}>
                    <TouchableOpacity onPress={() => {
                      setSearchQuery(search);
                      handleSearch;
                    }
                    }>
                      <Text style={styles.recentSearchText}>{search}</Text>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                      removeSearchItem(index);
                    }
                    }>
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
              <TouchableOpacity onPress={
                () => {
                  console.log('Search:', searchHistory[searchHistory.length - 1]);
                  setSearchQuery("freida");
                  handleSearch;
                }
              
              }>
                <View style={styles.card}>
                  <Image
                    source={require('../../assets/SharedShelves.png')} style={styles.image}
                  />
                  <Text style={styles.cardText}>{searchHistory[searchHistory.length - 1]}</Text>
                </View>
              </TouchableOpacity>

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
                      <Image source={getImageForBook(item.coverKey)} style={styles.modalImage} />
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={closeModal2}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FlatList
                  data={modalData}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        closeModal2();
                        setSelectedBookIndex(item.id);
                        navigation.navigate('BookDetails');
                      }}
                      style={styles.modalItem}
                    >
                      <Image source={coverImage} style={styles.modalImage} />
                      <View style={styles.modalTextContainer}>
                        <Text style={styles.modalTitle}>{item.title}</Text>
                        <Text style={styles.modalAuthor}>{item.author}</Text>
                        <Text style={styles.modalGenres}>{item.genres.join(', ')}</Text>
                        <Text style={styles.modalRating}>{item.rating} ★</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity onPress={closeModal2} style={styles.closeButton}>
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
              <TouchableOpacity onPress={() => openModalWithGenre('Classic')} style={[styles.genreItem, { backgroundColor: '#9DCC9B' }]}>
                <Text style={styles.genreTextOverlay}>Classic</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModalWithGenre('Romance')} style={styles.genreItem}>
                <Image source={require('../../assets/romance.jpg')} style={styles.genreImage} />
                <Text style={styles.genreTextOverlay}>Romance</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModalWithGenre('Fantasy')} style={[styles.genreItem, { backgroundColor: '#53A577' }]}>
                <Text style={styles.genreTextOverlay}>Fantasy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.genreList}>
              <TouchableOpacity onPress={() => openModalWithGenre('Mystery')} style={[styles.genreItem, { backgroundColor: '#99CD85' }]}>
                <Text style={styles.genreTextOverlay}>Mystery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModalWithGenre('Adventure')} style={[styles.genreItem, { backgroundColor: '#7EC096' }]}>
                <Text style={styles.genreTextOverlay}>Adventure</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModalWithGenre('Thriller')} style={[styles.genreItem, { backgroundColor: '#B2DCBE' }]}>
                <Text style={styles.genreTextOverlay}>Thriller</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.genreHeader}>
              <TouchableOpacity style={styles.exploreButton} onPress={() => openModalWithGenre('any')}>
                <Text style={styles.exploreButtonText}>Explore All Genres</Text>
              </TouchableOpacity>
            </View>

          </View>

        </TouchableOpacity>
      </ScrollView>
    </View> //VIEW DO CONTAINER TODO


  );
};

const styles = StyleSheet.create({
  container: {
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
    marginLeft: 24,
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

  suggestionsContainer: {
    marginTop: 13,
    backgroundColor: '#EEEEEE',
    position: 'absolute',
    top: 35,
    left: -15,
    right: 0,
    borderWidth: 0.5,
    borderRadius: 5,
    shadowColor: 'black',
    marginBottom: 10,
    marginLeft: 15,
    width: 330,
  },

  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
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
    borderRadius: 5,
    marginTop: 10,
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

  },

  genreText: {
    color: 'white', // Substitua pela cor do texto desejada
  },
  exploreButton: {
    backgroundColor: '#addfad',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  exploreButtonText: {
    color: 'black', // Substitua pela cor do texto do botão "Explorar todos"
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  genreItem: {
    margin: 3,
    width: '32%', // defina conforme necessário
    height: 60, // defina conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Adiciona um contexto de posicionamento para os filhos absolutos
  },
  genreImage: {
    width: '100%',
    height: '100%', // A imagem preenche todo o TouchableOpacity
  },
  genreTextOverlay: {
    position: 'absolute', // Posiciona sobre a imagem
    color: 'black', // Cor do texto
    fontWeight: 'bold',
    fontSize: 17,
    // Adicione sombra ao texto para melhor leitura sobre a imagem
    textShadowColor: 'rgba(255, 255, 255, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});