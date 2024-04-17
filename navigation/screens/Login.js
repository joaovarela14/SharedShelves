import * as React from 'react';
import { View, Text, TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#3A8D5B"
          style={{ marginLeft: 10, marginTop: 15 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Login</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>Welcome back!</Text>
        <Text style={{ fontSize: 18, marginTop: 3}}>Please login to continue..</Text>
        <View style={{marginTop:15}}>
            <TextInput style={styles.inputs} placeholder='Username' >
            </TextInput>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#3A8D5B',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
},
    inputs: {
        height: 40,
        marginTop: 50, 
        fontSize: 18, 
        borderWidth:1,
        borderColor: '#3A8D5B',
        borderRadius: 10,
},
});
