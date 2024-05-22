import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminHomeScreen() {
  const navigation = useNavigation();

  const navigateToActiveJobs = () => {
    navigation.navigate('ActiveJobsScreen');
  };

  const navigateToJobSeeker = () => {
    navigation.navigate('JobSeekerListScreen');
  };

  const navigateToEmployer = () => {
    navigation.navigate('EmployerListScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToActiveJobs}>
        <Text style={styles.buttonText}>Active Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToJobSeeker}>
        <Text style={styles.buttonText}>Job Seeker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToEmployer}>
        <Text style={styles.buttonText}>Employer</Text>
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
    backgroundColor: '#026efd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
