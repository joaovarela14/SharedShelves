import * as React from 'react';
import { View, Text, TouchableOpacity,ScrollView} from 'react-native';
import { useGlobalState } from './GlobalContext'; // Importe o contexto
import booksData from '../../books.json'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListsScreen({ route, navigation }) {
    const { listName } = route.params;
  const { wishlist } = useGlobalState(); // Usar o hook para acessar a wishlist
  const { setSelectedBookIndex } = useGlobalState();

    let listData;
  switch (listName) {
    case "Wishlist":
      listData = wishlist.map(bookId => booksData.find(book => book.id === bookId));
      break;
    default:
      listData = [];
      break;
  }
  return (
    <View style={{ flex: 1}}>
        <View style={styles.header}>
            <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{ marginLeft: 15, marginTop: 30 }}
            onPress={() => navigation.navigate('Shelf')}
            />
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        {wishlist.length > 0 ? (
        <ScrollView>
            {wishlist.map((bookId, index) => {
                const book = booksData.find(b => b.id === bookId);
                console.log('Book:', book);
                if (!book) return null; // Certifique-se de que o livro foi encontrado

                return (
                    <View key={index} style={styles.bookItem}>
                        <Text style={styles.bookTitle}>{book.title}</Text>
                        <TouchableOpacity onPress={() => {setSelectedBookIndex(index);
                          navigation.navigate('BookDetails', { bookId: book.id });}}>
                            <Text>View Details</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </ScrollView>
        ) : (
            <Text>No books in your wishlist</Text>
        )}
      </View>
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:'15',
    marginTop:'10',
  },
  button: {
    height: 100, // Altura fixa para o TouchableOpacity
    width: '100%', // Ocupa toda a largura do container
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center', // Centraliza o texto horizontalmente
    borderBottomWidth: 1, // Espessura da borda na parte inferior
  },
  bookItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
};