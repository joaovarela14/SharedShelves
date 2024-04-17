import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] =useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorFullname, setErrorFullname] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    function ErrorMessage({ message }) {
        return (
            <View style={styles.errorMessageContainer}>
            <Ionicons name="alert-circle" size={14} color="red" />
            <Text style={styles.errorText}>{message}</Text>
            </View>
        );
    }
    function handleRegister() {
        let valid = true;

        // Validar fullname
        if (fullname.length === 0) {
            setErrorFullname('Full name is required');
            valid = false;
        } else {
            setErrorFullname('');
        }

        // Validar username
        if (username.length === 0) {
            setErrorUsername('Username is required');
            valid = false;
        } else {
            setErrorUsername('');
        }

        // Validar email
        if (!validateEmail(email)) {
            setErrorEmail('Please enter a valid email');
            valid = false;
        } else {
            setErrorEmail('');
        }

        // Validar password
        if (password.length < 6) {
            setErrorPassword('Password must be at least 6 characters');
            valid = false;
        } else {
            setErrorPassword('');
        }

        // Confirmar password
        if (password !== confirmPassword) {
            setErrorConfirmPassword('Passwords do not match');
            valid = false;
        } else {
            setErrorConfirmPassword('');
        }

        if (valid) {
            const data = {
                username,
                password,
                email,
                fullname,
            };
            console.log(data);
            // Aqui você faria o registro do usuário (e.g., enviar para um servidor)
        }
    }


    return (
    <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
            <Ionicons
            name="arrow-back"
            size={24}
            color="#3A8D5B"
            style={{ marginLeft: 10, marginTop: 15 }}
            onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Register</Text>
            <Text style={{ fontSize: 18, marginTop: 10 , marginBottom:25}}>Welcome to SharedShelves!</Text>
            <View style={styles.inputGroup}>
                    <Ionicons name="person-outline" size={20} color="#3A8D5B" style={styles.icon} />
                    <TextInput 
                        style={styles.inputs} 
                        placeholder='Fullname' 
                        placeholderTextColor="#3A8D5B"
                        onChangeText={(text) => {setFullname(text); setErrorFullname('');}}
                        value={fullname} 
                />
            </View>
            {errorFullname ? <ErrorMessage message={errorFullname} /> : <View style={styles.errorPlaceholder} />}
            <View style={styles.inputGroup}>
                    <Ionicons name="person-circle-outline" size={20} color="#3A8D5B" style={styles.icon} />
                    <TextInput 
                        style={styles.inputs} 
                        placeholder='Username' 
                        placeholderTextColor="#3A8D5B"
                        onChangeText={(text) => {setUsername(text); setErrorUsername('');}}
                        value={username}
                    />
            </View>
            {errorUsername ? <ErrorMessage message={errorUsername} /> : <View style={styles.errorPlaceholder} />}           
            <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#3A8D5B" style={styles.icon} />
                <TextInput 
                    style={styles.inputs} 
                    placeholder='Email' 
                    placeholderTextColor="#3A8D5B"
                    onChangeText={(text) => {setEmail(text); setErrorEmail('');}}
                    value={email}
                />
            </View>
                {errorEmail ? <ErrorMessage message={errorEmail} /> : <View style={styles.errorPlaceholder} />}
            <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#3A8D5B" style={styles.icon} />
                <TextInput 
                    style={styles.inputs} 
                    placeholder='Password' 
                    secureTextEntry={true} 
                    placeholderTextColor="#3A8D5B"
                    onChangeText={(text) => {setPassword(text); setErrorPassword('');}}
                    value={password}
                />
            </View>
            {errorPassword ? <ErrorMessage message={errorPassword} /> : <View style={styles.errorPlaceholder} />}   
            <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#3A8D5B" style={styles.icon} />
                <TextInput 
                    style={styles.inputs} 
                    placeholder='Confirm Password' 
                    secureTextEntry={true} 
                    value={confirmPassword}
                    onChangeText={(text) => {setConfirmPassword(text); setErrorConfirmPassword('');}}
                    placeholderTextColor="#3A8D5B"
                />
            </View>
            {errorConfirmPassword ? <ErrorMessage message={errorConfirmPassword} /> : <View style={styles.errorPlaceholder} />}        
            <View style={styles.centeredButtonContainer}>
                <TouchableOpacity style={styles.botaoRegister} onPress={handleRegister}>
                <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
  inputGroup: {
    marginBottom:10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A8D5B',
    paddingLeft:10 ,
    marginTop: 15,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputs: {
    flex: 1, // Makes TextInput expand to fill the space
    fontSize: 18,
  },
  centeredButtonContainer: {
    alignItems: 'center',
    marginTop: 50, // Pode ajustar conforme necessário
  },
  botaoRegister: {
    backgroundColor: '#3A8D5B',
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
    errorMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 18,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginLeft: 5, // Espaço entre o ícone e o texto
    },
    errorPlaceholder: {
        height: 18,
        marginBottom: 10,
    },
});