import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, NumberInput, ScrollView, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useGlobalState } from './GlobalContext';

import booksData from '../../books.json';


export default function GetBook({ navigation }) {
  const resetFieldsAndNavigate = () => {
    setTitle('');
    setSuggestions([]);
    setBookState('');
    setSearchQuery('');
    setUserCount('');
    setSelectedCity('City');
    navigation.navigate('Book');
    setModalVisible(false);
    setLastModalVisible(false);
    setDetailsModalVisible(false);

  };

  const checkFields = () => {
    let hasError = false;
    setErrorTitle('');
    setErrorBookState('');
    setErrorCity('');
    setErrorUserCount('');

    if (!title.trim()) {
      setErrorTitle("Please enter a title.");
      hasError = true;
    }

    if (!bookState.trim()) {
      setErrorBookState("Please select a book state.");
      hasError = true;
    }

    if (selectedCity === 'City') {
      setErrorCity("Please select a city from the list.");
      hasError = true;
    }

    if (!userCount.trim()) {
      setErrorUserCount("Please select the number of users.");
      hasError = true;
    }

    if (hasError) {
      return false;
    }
    return true;
  };


  const [title, setTitle] = useState('');
  const [bookState, setBookState] = useState('');
  const [date, setDate] = useState(new Date());
  const [userCount, setUserCount] = useState('');
  const [selectedCity, setSelectedCity] = useState('City');

  const [errorTitle, setErrorTitle] = useState('');
  const [errorBookState, setErrorBookState] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorUserCount, setErrorUserCount] = useState('');


  const lojas = {
    'Lisboa': ['Livraria Lusitana', 'Espaço de Leitura Lisboa', 'Papelaria dos Navegadores', 'Cantinho do Livro', 'Portal Literário'],
    'Porto': ['Livraria do Dragão', 'Cantinho do Porto', 'Alfarrabista Tripeiro', 'Espaço Douro', 'Papelaria Portuense'],
    'Coimbra': ['Coimbra Livros', 'Estudante Editora', 'Alfarrabista do Mondego', 'Biblioteca Acadêmica', 'Livraria dos Estudantes'],
    'Braga': ['Braga Papel e Tinta', 'Livraria Minho', 'Cantinho do Leitor Bracarense', 'Espaço de Leitura Gualtar', 'Livros de Braga'],
    'Aveiro': ['Livraria dos Moliceiros', 'Aveiro Livros', 'Espaço Litoral', 'Ria de Letras', 'Papelaria Veneza Portuguesa'],
    'Faro': ['Livraria Algarvia', 'Faro Literário', 'Papelaria do Sul', 'Cantinho do Leitor Algarvio', 'Livros do Algarve'],
    'Leiria': ['Leiria Livros', 'Espaço de Leitura Liz', 'Livraria do Castelo', 'Papelaria Leiriense', 'Portal do Livro'],
    'Setubal': ['Setúbal Literária', 'Livraria do Sado', 'Papelaria Sadina', 'Livros à Beira-Mar', 'Cantinho do Livro Setubalense'],
    'Viseu': ['Viseu de Letras', 'Espaço Dão', 'Livraria Beirã', 'Cantinho do Livro Viseense', 'Biblioteca Viseu'],
    'Viana do Castelo': ['Livraria do Lima', 'Cantinho Vianense', 'Papelaria do Castelo', 'Viana Literária', 'Livros e Mar']
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

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');



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

  const onClose = () => {
    setLastModalVisible(!lastModalVisible);
  };

  const openLast = () => {
    setLastModalVisible(!lastModalVisible);
  };

  const handleSearch = () => {
    setShowSuggestions(false);
  };

  const storesGenerator = () => {
    if (!checkFields()) {
      return;
    }
    const storeList = lojas[selectedCity];
    const randomCount = Math.floor(Math.random() * 5) + 1;
    const shuffledStores = storeList.sort(() => 0.5 - Math.random());
    const selectedStores = shuffledStores.slice(0, randomCount);

    console.log(selectedStores);
    return selectedStores
  }


  const PointsGenerator = () => {
    let min, max;
    let Points = 0;

    switch (bookState) {
      case 'new':
        min = 800;
        max = 1000;
        break;
      case 'barely new':
        min = 400;
        max = 600;
        break;
      case 'used':
        min = 200;
        max = 400;
        break;
      default:
        min = 1;
        max = 100;
        break;
    }

    switch (userCount) {
      case 'single':
        min *= 1;
        max *= 1;
        break;
      case 'few':
        min -= 100;
        max -= 100;
        break;
      case 'many':
        min -= 250;
        max -= 250;
        break;
      case 'tooMany':
        min = min - 400;
        max = max - 400;
        break;
    };
    Points = Math.floor(Math.random() * (max - min + 1)) + min;

    if (Points < 0) {
      Points = 50;
    }

    return Points;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [stores, setStores] = useState([]);
  const [points, setPoints] = useState(0);
  const [lastModalVisible, setLastModalVisible] = useState(false);

  const handleOpenModal = () => {
    if (!checkFields()) {
      return;
    }
    setStores(storesGenerator());
    setPoints(PointsGenerator());
    setModalVisible(true);
  };

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState({ name: '', points: 0 });

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setDetailsModalVisible(true);
  };

  const { totalPoints, addPoints } = useGlobalState();



  return (
    <View style={styles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>

        <View style={styles.headerText}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Get Book</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 120, color: 'darkgreen' }}>{totalPoints}
            <MaterialCommunityIcons name="leaf" size={20} color="green" />

          </Text>

        </View>

        <View >
          <Text style={styles.informative} >Fill out the following parameters.
            After filling out the following parameters, you will be informed about the locations where your book is available and the various point costs.
            This way, you can immediately pick up your book to start your new reading as soon as possible. </Text>
        </View>

        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 20 }}>Informations about the book:</Text>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Book:</Text>
          <Text style={styles.errorText}>{errorTitle}</Text>
        </View>

        
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Search your book"
            style={styles.input}
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
          
        </View>





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
          <Text style={styles.label}>Number of Users:</Text>
          <Text style={styles.errorText}>{errorUserCount}</Text>
        </View>
        <View style={styles.bookStateContainer}>
          <TouchableOpacity
            style={[
              styles.bookStateOption,
              userCount === 'single' ? styles.selected : {},
            ]}
            onPress={() => setUserCount('single')}
          >
            <Text style={styles.bookStateText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bookStateOption,
              userCount === 'few' ? styles.selected : {},
            ]}
            onPress={() => setUserCount('few')}
          >
            <Text style={styles.bookStateText}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bookStateOption,
              userCount === 'many' ? styles.selected : {},
            ]}
            onPress={() => setUserCount('many')}
          >
            <Text style={styles.bookStateText}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bookStateOption,
              userCount === 'tooMany' ? styles.selected : {},
            ]}
            onPress={() => setUserCount('tooMany')}
          >
            <Text style={styles.bookStateText}>4+</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.labelContainer}>
          <Text style={styles.label}>Select your city:</Text>
        </View>


        <Picker
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedCity(itemValue);
          }}>
          {Object.entries(cities).map(([key, value]) => (
            <Picker.Item key={key} label={value} value={key} />
          ))}
        </Picker>
        <Text style={{ color: 'red', fontSize: 14, flex: 1, marginBottom: 10, marginLeft: 20 }}>{errorCity}</Text>


        <View style={styles.centeredcontainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleOpenModal}>
            <Text style={styles.buttonText}>Search Book</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={modal_styles.centeredView}>
            <View style={modal_styles.modalView}>
              <ScrollView>
                {stores.map((store, index) => (
                  <TouchableOpacity key={index} style={modal_styles.storeContainer} onPress={() => handleStoreSelect(store)}>
                    <Text style={modal_styles.storeText}>{store}: {points} <MaterialCommunityIcons name="leaf" size={20} color="green" /></Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[modal_styles.button, modal_styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => {
            setDetailsModalVisible(!detailsModalVisible);
          }}
        >
          <View style={modal_styles.centeredView}>
            <View style={modal_styles.modalView}>
              <Text style={modal_styles.modalText}>Store Details</Text>
              <Text style={modal_styles.storeText}>Name: {selectedStore}</Text>
              <Text style={modal_styles.storeText}>Points: {points} <MaterialCommunityIcons name="leaf" size={20} color="green" /> </Text>
              <Text style={modal_styles.storeText}>Schedule: Open from 10:00 to 20:00  </Text>
              <TouchableOpacity
                style={[modal_styles.button, modal_styles.buttonClose]}
                onPress={() => {
                  setDetailsModalVisible(!detailsModalVisible);
                  setModalVisible(!modalVisible);
                  openLast();
                  if (totalPoints > points) {
                    setTotalPoints(totalPoints - points);
                  }

                }}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={lastModalVisible}
          onRequestClose={!lastModalVisible}
        >
          <View style={modal_styles.centeredView}>
            <View style={modal_styles.modalView}>
              {totalPoints < points ? <Text style={modal_styles.modalText}>You don't have enough points to reserve this book. </Text>
                :
                <Text style={modal_styles.modalText}>Your book has been reserved! {points} points have been deducted, leaving you with a total of:
                  <Text style={modal_styles.pointsText}>{totalPoints}</Text>
                  <MaterialCommunityIcons name="leaf" size={20} color="green" />
                </Text>
              }


              <LottieView
                source={require('../../assets/points.json')}
                autoPlay
                loop
                style={styles.lottieStyle}
              />
              <TouchableOpacity onPress={resetFieldsAndNavigate}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    padding: 30,
    position: 'relative',
  },
  centeredcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'row', 
    fontWeight: 'bold', 
    justifyContent: 'space-between'
  },
  informative: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    color: 'gray',
    textAlign: 'justify',

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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    height: 40,
    marginLeft: 15,
    width: "90%",
    borderRadius: 7,
  },



  inputLabel: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    marginTop: 5,
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
  picker: {
    backgroundColor: '#fff',
    height: 50,
    width: 200,
    marginLeft: 21,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 55,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10

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
  buttonText: {
    fontSize: 20,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    flex: 1,
    marginBottom: 10,
    marginLeft: 20
  },
  suggestionsContainer: {
    marginTop: 5,
    backgroundColor: '#EEEEEE',
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    zIndex: 1,
    borderWidth: 0.5,
    borderRadius: 5,

    shadowColor: 'black',
    
    marginBottom: 10,
    marginLeft: 15,
    width: 300,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  lottieStyle: {
    width: 100,
    height: 100,
  }

});

const modal_styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#addfad',
    marginTop: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',

  },
  storeContainer: {
    backgroundColor: '#F0F0F0', // Light grey background for each store container
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD', // Soft border color
    width: 250 // Fixed width, adjust as needed
  },
  storeText: {
    textAlign: 'center',
    color: '#333', // Darker text for better readability
    fontSize: 16,
  },
  pointsText: {
    fontSize: 18, // Make the points stand out
    fontWeight: 'bold',
    color: 'green', // Example color for emphasis
  }
});
