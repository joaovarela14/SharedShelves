import * as React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
            source={require('../../assets/logo.png')}
            style={{ width: 200, height: 200, marginTop: 20 }}
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Shared Shelves</Text> 
        </View>
    );
}