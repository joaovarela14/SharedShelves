import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function ProfileScreen() {
  const navigation = useNavigation(); // Use the useNavigation hook to get navigation object

  const goToSettings = () => {
    navigation.navigate('Settings'); // Navigate to the 'Settings' screen
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'top', justifyContent: 'space-between', paddingHorizontal: 12, padding: 35 }}>
      <Text style={{ fontSize: 23, fontWeight: 'bold' }}> Welcome Filipa!</Text>

      <TouchableOpacity onPress={goToSettings}>
        <Ionicons name="settings" size={30} color="black" />
      </TouchableOpacity>
    </View>

    
  );
}