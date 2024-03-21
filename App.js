import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SharedShelves</Text>
      <Text style={{ color: 'green' }}>Welcome to SharedShelves! </Text> 
      <Button color={'lightgreen'} title="Login" onPress={() => openURL('https://www.bertrand.pt/')} />
      <Text style={{ color: 'blue' }}>Don't have an account? Register now! </Text>
      <Button color={'lightblue'} title="Register" onPress={() => useNavigation.navigate('Pagina2.js')} /> 

      
      <StatusBar style="auto" />
    </View>
  );
}



const openURL = (url) => {
  // Use Linking to open the URL in the device's default browser
  Linking.openURL(url)
    .then(() => console.log('URL opened successfully'))
    .catch((err) => console.error('An error occurred: ', err));
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkgreen',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'

  }

});
