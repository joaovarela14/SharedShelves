import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useGlobalState } from './GlobalContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation(); // Use the useNavigation hook to get navigation object

  const goToSettings = () => {
    navigation.navigate('Settings'); // Navigate to the 'Settings' screen
  };

  const { totalPoints } = useGlobalState();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={require('../../assets/profile.png')}
            />
          </View>
          <Text style={styles.name}>João</Text>
          <Text style={styles.location}>Portugal</Text>
          <Text style={styles.since}>Since 2024</Text>
        </View>
        <TouchableOpacity onPress={goToSettings}>
          <Ionicons name="settings-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.walletContainer}>
        <View style={styles.walletSection}>
          <Text style={styles.walletText}>Donations</Text>
          <Text style={styles.walletAmount}>5</Text>
        </View>
        <View style={styles.walletSection}>
          <Text style={styles.walletText}>Points</Text>
          <Text style={styles.walletAmount}>{totalPoints} <MaterialCommunityIcons name="leaf" size={20} color="green" /></Text>
        </View>
        <View style={styles.walletSection}>
          <Text style={styles.walletText}>Aquisitions</Text>
          <Text style={styles.walletAmount}>2</Text>
        </View>
      </View>
      <View style={styles.rankingSection}>
        <Text style={styles.rankingTitle}>National Ranking</Text>
        <View style={styles.rankingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="trophy" size={20} color="gold" />
            <Text style={[styles.rankingName, { marginLeft: 10 }]}>Filipe Esteves</Text>
          </View>
          <View style={styles.rankingPoints}>
            <Text style={styles.rankingValue}>10531</Text>
            <MaterialCommunityIcons name="leaf" size={20} color="green" />
          </View>
        </View>
        <View style={styles.rankingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="trophy" size={20} color="silver" />
            <Text style={[styles.rankingName, { marginLeft: 10 }]}>Inês Vieira</Text>
          </View>
          <View style={styles.rankingPoints}>
            <Text style={styles.rankingValue}>9510</Text>
            <MaterialCommunityIcons name="leaf" size={20} color="green" />
          </View>
        </View>
        <View style={styles.rankingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="trophy" size={20} color="brown" />
            <Text style={[styles.rankingName, { marginLeft: 10 }]}>Miguel Matos</Text>
          </View>
          <View style={styles.rankingPoints}>
            <Text style={styles.rankingValue}>9362</Text>
            <MaterialCommunityIcons name="leaf" size={20} color="green" />
          </View>
        </View>
        <View style={styles.rankingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="medal" size={20} color="black" />
            <Text style={[styles.rankingName, { marginLeft: 10 }]}>David Marques</Text>
          </View>
          <View style={styles.rankingPoints}>
            <Text style={styles.rankingValue}>9002</Text>
            <MaterialCommunityIcons name="leaf" size={20} color="green" />
          </View>
        </View>
        <View style={styles.rankingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="medal" size={20} color="black" />

            <Text style={[styles.rankingName, { marginLeft: 10 }]}>Mariana Trindade</Text>
          </View>
          <View style={styles.rankingPoints}>
            <Text style={styles.rankingValue}>8874</Text>
            <MaterialCommunityIcons name="leaf" size={20} color="green" />
          </View>
        </View>
        <View style={styles.rankingItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="medal" size={20} color="black" />

            <Text style={[styles.rankingName, { marginLeft: 10 }]}>Rosa Ferreira</Text>
          </View>
          <View style={styles.rankingPoints}>
            <Text style={styles.rankingValue}>8870</Text>
            <MaterialCommunityIcons name="leaf" size={20} color="green" />
          </View>
        </View>
      </View>

      <View style={styles.socialMediaSection}>
        <Text style={styles.socialMediaTitle}>Follow Us</Text>
        <View style={styles.socialMediaIcons}>
          <TouchableOpacity onPress={() => {/* Add your social media link here */}}>
            <Ionicons name="logo-facebook" size={40} color="#3b5998" style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Add your social media link here */}}>
            <Ionicons name="logo-twitter" size={40} color="#00acee" style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Add your social media link here */}}>
            <Ionicons name="logo-instagram" size={40} color="#C13584" style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Add your social media link here */}}>
            <Ionicons name="logo-linkedin" size={40} color="#0e76a8" style={styles.socialMediaIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'top', // Change to center
    marginVertical: 20,
  },
  headerCenter: {
    alignItems: 'center',
  },
  avatarContainer: {
    borderRadius: 50,
    padding: 2,
    backgroundColor: '#000',
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
    fontSize: 18,
    color: '#333',
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  rankingSection: {
    marginBottom: 20,
  },
  rankingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rankingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  rankingName: {
    fontSize: 18,
  },
  rankingPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 5,
  },
  socialMediaSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  socialMediaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialMediaIcon: {
    marginHorizontal: 10,
  },
});

