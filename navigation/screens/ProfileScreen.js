import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>PROFILE</Text>
        </TouchableOpacity>
        </View>
    );
    }