import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function BooksScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>BOOK</Text>
        </View>
    );
    }