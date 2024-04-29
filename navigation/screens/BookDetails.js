import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Clipboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useGlobalState } from './GlobalContext';

import booksData from '../../books.json'; // Importa o arquivo JSON com dados dos livros
import SearchScreen from '../screens/SearchScreen';

const index = SearchScreen.bookindex;
const Stack = createStackNavigator();


export default function BookDetails({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Details"
        component={BookDetailsContent}
        options={({ navigation }) => ({
          headerTitle: 'Book Details',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function BookDetailsContent({ route }) {
  const { selectedBookIndex } = useGlobalState();
  const book = booksData[selectedBookIndex];
  console.log('Book:', book);

  const [isCopied, setIsCopied] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString('CODESHSH5');
    setIsCopied(true);
    ToastAndroid.show('Copied to your clipboard', ToastAndroid.SHORT);
    setTimeout(() => setIsCopied(false), 2000);
  };

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

  const coverImage = book.cover ? imageMap[book.cover] : null;
  const storeLogos = book.stores
  .map(store => ({
    ...store,
    logo: imageMap[store.logo]
  }))
  .sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')));

  const openURL = (url) => {
    Linking.openURL(url).catch(err => {
      console.error("Failed to open URL:", err);
      alert('Não foi possível abrir o site.');
    });
  };

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.bookHeader}>

        <Image source={coverImage} style={styles.bookCover} />

        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <Text style={styles.bookRating}>{`${book.rating} ★`}</Text>
          <Text style={styles.bookGenres}>{book.genres.join(' / ')}</Text>
          
          <TouchableOpacity onPress={() => setDescriptionExpanded(!descriptionExpanded)}>
            
            <View style={styles.dropdownHeader}> 
              <Text style={styles.dropdownHeaderText}>Description</Text>
              <Ionicons 
                name={descriptionExpanded ? 'arrow-up-outline' : 'arrow-down-outline'} 
                size={24} 
                color="black" 
              />
            </View>

          </TouchableOpacity>
        </View>

      </View>
      {descriptionExpanded && <Text style={styles.bookDescription}>{book.description}</Text>}

      
      <Text style={styles.discountCodeText}> Promo Code 5%</Text>

      <View style={styles.discountAndBuyContainer}>
        <View style={styles.buyFromContainer}>
          <Text style={styles.buyFromText}>Buy from...</Text>
        </View>

        <View style={styles.discountCodeContainer}>
          <TouchableOpacity onPress={copyToClipboard}>
            <View style={styles.dropdownHeader}> 
              <MaterialIcons name="discount" size={16} color="black" /> 
              <Text style={styles.discountCodeText}> CODESHSH5</Text>
            </View>

          </TouchableOpacity>
        </View>
      </View>
      {isCopied && <Text style={{textAlign: 'right'}}>Copied to your clipboard</Text>}

      <View style={styles.storeButtonsContainer}>
        {book.stores
          .slice()
          .sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')))
          .map((store, index) => (
            <View key={index} style={styles.storeButtonCard}>
              <TouchableOpacity style={styles.storeButton} >
                {/* onPress={openURL(storeLogos[index].url)} */}
                <Image source={storeLogos[index].logo} style={styles.image} />
                <Text style={styles.storeButtonText}>{store.name}</Text>
                <Text style={styles.storeButtonPrice}>{store.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  bookHeader: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  bookCover: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    marginRight: 20,
  },
  bookInfo: {
    justifyContent: 'space-around',
    
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 18,
    color: 'grey',
  },
  bookRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gold',
  },
  bookGenres: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  bookDescription: {
    fontSize: 16,
    color: 'grey',
  },
  storeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  bookDescription: {
    fontSize: 16,
    color: 'grey',
  },


  discountCodeContainer: {
    backgroundColor: '#B6D3B7', // Escolha uma cor de fundo que combine com o seu layout
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centralizar o texto no container
    width: '40%',
  },

  discountCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Você pode escolher uma cor que faça o texto se destacar
    textAlign: 'right',
  },

  discountAndBuyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buyFromText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    
  },


  storeButtonsContainer: {
    marginTop: 4,
  },
  storeButtonCard: {
    backgroundColor: '#fff', // Cor de fundo do cartão
    borderRadius: 8, // Bordas arredondadas do cartão
    shadowColor: '#000', // Sombra do cartão
    shadowOffset: { width: 0, height: 2 }, // Sombra do cartão
    shadowOpacity: 0.23, // Sombra do cartão
    shadowRadius: 2.62, // Sombra do cartão
    elevation: 4, // Elevação do cartão para Android
    marginVertical: 8, // Espaçamento vertical entre os cartões
    width: 340,
    marginLeft: 5,
  },
  storeButton: {
    flexDirection: 'row', // Alinhar ícone e texto na horizontal
    alignItems: 'center', // Centralizar verticalmente dentro do botão
    justifyContent: 'space-between', // Espaço entre o ícone e o texto
    padding: 15, // Espaçamento interno do botão
  },
  storeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  storeButtonPrice: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 40, // Largura adaptada para uma capa de livro
    height: 40, // Altura maior para formato de livro
  },


});