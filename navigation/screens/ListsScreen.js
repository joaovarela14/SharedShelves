import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useGlobalState } from './GlobalContext';
import booksData from '../../books.json';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListsScreen({ route, navigation }) {
  const { listName } = route.params;
  const { lists, setSelectedBookIndex } = useGlobalState();

  const listData = lists[listName]?.items.map(bookId => booksData.find(book => book.id === bookId)) || [];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>{listName}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.5, borderRadius: 20, padding: 10 }}>
        {listData.length > 0 ? (
          <ScrollView>
            {listData.map((book, index) => {
              if (!book) return null;
              return (
                <View key={index} style={styles.bookItem}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <TouchableOpacity onPress={() => {
                    setSelectedBookIndex(book.id);
                    navigation.navigate('BookDetails', { bookId: book.id });
                  }}>
                    <Text style={styles.detailsButton}>View Details</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Ionicons name="add-circle-outline" size={50} color="#3A8D5B" />
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text>No books in your {listName}</Text>
        )}
      </View>
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  pageTitleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookItem: {
    flexDirection: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 80,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    color: '#3A8D5B',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  }
};
