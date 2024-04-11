import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>SEARCH</Text> 

      <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, marginTop: 20 }}>
        <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search title or author"
          style={{
            width: 200, 
            fontSize: 14,
            paddingVertical: 5,
          }}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: 'blue',
            padding: 8,
            borderRadius: 5,
            marginLeft: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 14 }}>Enter</Text>
        </TouchableOpacity>

      </View>
      <View>

        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Recent</Text> 
      </View>

      <View>

        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Latest Search</Text> 
      </View>
    </View>
  );
}
