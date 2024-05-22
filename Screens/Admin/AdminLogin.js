import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminLogin() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleLogin = () => {
    // Assuming default username, password, and security code
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123';
    const defaultSecurityCode = '1234';

    if (username === defaultUsername && password === defaultPassword && securityCode === defaultSecurityCode) {
      navigation.navigate('AdminHome'); // Assuming 'AdminHomeScreen' is the screen name for Admin Home
      console.log('Login successful')
    } else {
      Alert.alert('Error', 'Invalid credentials. Please check your username, password, and security code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize='none'
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Security Code"
        onChangeText={(text) => setSecurityCode(text)}
        value={securityCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#026efd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
