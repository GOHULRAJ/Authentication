import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

export default function MainScreen() {
  const navigation = useNavigation();

  const handleJobSeekerPress = () => {
    navigation.navigate('Login'); // Assuming 'JobSeekerLogin' is the screen name for Job Seeker login
  };

  const handleEmployerPress = () => {
    navigation.navigate('EmpLogin'); // Assuming 'EmployerLogin' is the screen name for Employer login
  };

  const handleAdminPress = () => {
    navigation.navigate('AdminLogin'); // Assuming 'AdminLogin' is the screen name for Admin login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your App</Text>
      <TouchableOpacity style={styles.button} onPress={handleJobSeekerPress}>
        <Icon name="user" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Job Seeker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEmployerPress}>
        <Icon name="building" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Employer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAdminPress}>
        <Icon name="user-secret" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Admin</Text>
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
  button: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: '#026efd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Add margin between icon and text
  },
  icon: {
    marginRight: 10, // Add margin to the right of the icon
  },
});
