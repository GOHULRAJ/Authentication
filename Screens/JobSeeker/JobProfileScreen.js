import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function JobProfileScreen({ route, navigation }) {
  const { job } = route.params;

  const handleApply = () => {
    // Handle apply logic here
    // For example, navigate to application form screen
    //navigation.navigate('ApplicationForm', { jobId: job.id });
    console.log('handleApply')
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{job.jobTitle}</Text>
      <Text style={styles.subtitle}>Job Description</Text>
      <Text>{job.jobDescription}</Text>
      <Text style={styles.subtitle}>Required Skills</Text>
      <Text>{job.requiredSkills}</Text>
      <Text style={styles.subtitle}>Job Location</Text>
      <Text>{job.jobLocation}</Text>
      <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#026efd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
