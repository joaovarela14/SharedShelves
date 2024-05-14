import React, { useEffect }from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function ProfileScreen() {
  const navigation = useNavigation(); // Use the useNavigation hook to get navigation object

  const goToSettings = () => {
    navigation.navigate('Settings'); // Navigate to the 'Settings' screen
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../../assets/logo.png')}
          />
        </View>
        <Text style={styles.name}>Seven Kay</Text>
        <Text style={styles.location}>Islamabad</Text>
        <Text style={styles.since}>Since 2022</Text>
      </View>
      <View style={styles.walletContainer}>
        <View style={styles.walletSection}>
          <Text style={styles.walletText}>Wallet</Text>
          <Text style={styles.walletAmount}>PKR 125</Text>
        </View>
        <View style={styles.walletSection}>
          <Text style={styles.walletText}>Spent</Text>
          <Text style={styles.walletAmount}>PKR 2K+</Text>
        </View>
      </View>
      {[
        'Your Favorite',
        'Payment',
        'Tell Your Friends',
        'Promotions',
        'Settings',
        'Log Out',
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.listItem}>
          <Text style={styles.listItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    borderRadius: 50,
    padding: 2,
    backgroundColor: '#000', // yellow background
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 18,
    color: '#777',
  },
  since: {
    fontSize: 16,
    color: '#777',
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  walletSection: {
    alignItems: 'center',
  },
  walletText: {
    fontSize: 16,
    color: '#333',
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 25,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    borderRadius: 25,
  },
});