import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BooksScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Donate')}>
                
                <LinearGradient
                    
                    start={{ x: 0, y: 0 }} // Start of the gradient from the left
                    end={{ x: 1, y: 0 }}   // End of the gradient to the right
                    colors={['#006400', '#2a7d2a', '#559755', '#7fb17f', '#aacbaa', '#d4e5d4', '#ffffff']} // Gradient colors
                    style={styles.Button}>
                    <Text style={styles.ButtonText1}>Donate Book</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.aquireButton}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.aquirebuttonText}>Aquire Points</Text>
                    <MaterialCommunityIcons name="leaf" size={24} color="green" style={{ marginLeft: 10 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <LinearGradient
                    start={{ x: 1, y: 0 }} // Start of the gradient from the right
                    end={{ x: 0, y: 0 }}   // End of the gradient to the left
                    colors={['#006400', '#2a7d2a', '#559755', '#7fb17f', '#aacbaa', '#d4e5d4', '#ffffff']} // Gradient colors
                    style={styles.Button}>
                    <Text style={styles.ButtonText2}>Get Book</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // This will distribute the buttons evenly vertically
        backgroundColor: '#fff',
    },
    Button: {
        width: 300, 
        height: 90,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        justifyContent: 'center', // Center content vertically
        overflow: 'hidden',
        

    },
    ButtonText1: {
        color: '#000',
        fontSize: 25,
        textAlign: 'left', 
    },
    ButtonText2: {
        color: '#000',
        fontSize: 25,
        textAlign: 'right', // Changed to center text
    },
    aquirebuttonText: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        textDecorationLine: 'underline'
        
    },
    aquireButton: {
        marginTop: 50, // adds space above the button
        marginBottom: 50, // adds space below the button
        width: 300,
        height: 90,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
