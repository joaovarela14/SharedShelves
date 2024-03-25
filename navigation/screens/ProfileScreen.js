import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Profile Screen</Text>
    
    </View>

  );
}