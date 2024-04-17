import * as React from 'react';
import { View, Text, TouchableOpacity,Image ,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

export default function FirstPage({navigation}) {

    return (
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
            <Image
                source={require('../../assets/SharedShelves.png')}
                style={{ width: 150, height: 150, marginTop: 20 }}
            />
            <Text style={{ fontSize: 27, fontWeight: 'bold', marginTop:10 }}>SharedShelves</Text> 
            <Text style={{ fontSize: 18, marginTop: 7}}>The 3 R'S:"Read, Recycle, Reconnect"</Text>
            </View>
            <View style={{marginTop: 50}}>
                <TouchableOpacity style={styles.botaoLogin}
                onPress={() => navigation.navigate('Login')} >
                    <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}
                style={styles.botaoRegister}>
                    <Text style={{ color: '#3A8D5B', fontSize: 20 }}>Register</Text>

                </TouchableOpacity>
            </View>

            <View style={{marginTop: 70}}>
                <Text style={{fontSize:18, }}>Turning Pages into Bonds...</Text>
            </View>
        </View>
        
    );
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    botaoLogin: {
        backgroundColor: '#3A8D5B',
        width: 300,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    botaoRegister: {
        backgroundColor: '#fff',
        width: 300,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderColor: '#3A8D5B',  // Adicionando a cor da borda
        borderWidth: 1  
    },
});