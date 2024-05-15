import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Feed() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>{'SharedShelves'}</Text>

      <View style={styles.action}>
        <View style={styles.actionContent}>
          <Text style={styles.actionText}>⚠️ Enjoy a 20% discount on 'The Housemaid's Secret' this week! ⚠️</Text>
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.actionContent}>
          <Text style={styles.actionText}>Limited-time offer: 'It Ends with Us' now available!</Text>
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.actionContent}>
          <Text style={styles.actionText}>Get your hands on 'Overkill' by Freida McFadden, now in the top books list!</Text>
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.actionContent}>
          <Text style={styles.actionText}>The book 'Harry Potter and the Philosopher's Stone' is now available at Viseu's Starbucks</Text>
          <Image 
            source={require('../../assets/sb.jpeg')} // Replace with your image path
            style={styles.horizontalImage}
          />
        </View>
      </View>
      
      <View style={styles.action}>
        <View style={styles.actionContent}>
          <Text style={styles.actionText}>Special offer: 'Behind the Net' by Stephanie Archer at half price!</Text>
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.actionContent}>
          <Text style={styles.actionText}>'1984' by George Orwell is in our top 10 books this month!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignContent: 'center',
    textAlign: 'center',
  },
  logo: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 20,
    color: 'darkgreen',
  },
  action: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '97%',
    alignSelf: 'center', // Center the action components horizontally
  },
  actionIcon: {
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
    alignItems: 'center', // Center the content horizontally
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Center the text horizontally
  },
  horizontalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
    marginTop: 20,
  },
});
