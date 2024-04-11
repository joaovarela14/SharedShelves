import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity, Button} from 'react-native';
import styles from '../../Style';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function ProfileScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 30 }}>
        
      
      
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Home Screen</Text>
      </TouchableOpacity>



    </View>
    

  );
}