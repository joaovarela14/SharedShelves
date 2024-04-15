import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


export default function BooksScreen({ navigation }) {
    return (
        <View style={styles.container}>
      <TouchableOpacity >
                <LinearGradient
                start={{ x: 0, y: 0 }} // Início do gradiente à esquerda
                end={{ x: 1, y: 0 }}   // Fim do gradiente à direita
                colors={['#A8E063', '#56AB2F', '#A4D96C', '#3D9970', '#228B22', '#004D40']} // Cores do degradê
                style={styles.Button}
                >
                <Text style={styles.ButtonText1}>Clique Aqui</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                
                
                onPress={() => navigation.navigate('Book')}>
                
                <Text >
                    Aquire Points
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.Button}
                
                
                colors={['#4c669f', '#3b5998', '#192f6a']} // Cores do degradê
                onPress={() => navigation.navigate('Book')}>


                <Text style= {styles.ButtonText2}>
                    Get Book
                </Text>
            </TouchableOpacity>


        </View>
      );
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        },
        Button: {
            width: 300, // Define a largura do botão
            height: 90,
            backgroundColor: '#3A8D5B',
            borderRadius: 8,
            padding: 10,
            margin: 10,
            alignItems: 'flex',
            // Manter o texto centralizado verticalmente
            justifyContent: 'center',
            overflow: 'hidden',
            
            
        },
        ButtonText1: {
            color: '#fff',
            fontSize: 20,
            textAlign: 'left',
        },
        ButtonText2: {
            color: '#fff',
            fontSize: 20,
            textAlign: 'right',
  
        },


    });