import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { db } from '../../config'; // Assuming you have exported db from your config file
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function EmployerLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      // Check if the email exists in the employer collection
      const employerQuery = query(collection(db, 'employer'), where('email', '==', email));
      const employerSnapshot = await getDocs(employerQuery);

      if (!employerSnapshot.empty) {
        // Email exists in the employer collection, now validate password
        const employerData = employerSnapshot.docs[0].data();
        if (employerData.password === password) {
          console.log('Login successful');
          navigation.navigate('EmpHome'); // Navigate to Home screen or your desired screen
        } else {
          console.log('Invalid password.');
          Alert.alert('Error', 'Invalid password.');
        }
      } else {
        console.log('Email not found.');
        Alert.alert('Error', 'Email not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Employer Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Email'
        onChangeText={(email) => setEmail(email)}
        autoCorrect={false}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.textInput}
        placeholder='Password'
        onChangeText={(password) => setPassword(password)}
        autoCorrect={false}
        autoCapitalize='none'
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={loginUser} style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
