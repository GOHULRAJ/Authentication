import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

export default function PostJob() {
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const postJob = () => {
    // const currentUser = firebase.auth().currentUser;
    // if (!currentUser) {
    //   alert('Please log in to post a job.');
    //   return;
    // }

    const jobData = {
      // employerId: currentUser.uid,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      requiredSkills: requiredSkills.split(',').map(skill => skill.trim()),
      jobLocation: jobLocation,
      salaryRange: salaryRange,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      expiryDate: firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    };

    firebase.firestore().collection('jobs').add(jobData)
      .then(() => {
        alert('Job posted successfully!');
        console.log('job posted successfully')
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Job</Text>
      <TextInput
        style={styles.input}
        placeholder="Job Title"
        onChangeText={text => setJobTitle(text)}
        value={jobTitle}
        autoCapitalize='none'
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Job Description"
        onChangeText={text => setJobDescription(text)}
        value={jobDescription}
        multiline={true}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Required Skills (Comma-separated)"
        onChangeText={text => setRequiredSkills(text)}
        value={requiredSkills}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Job Location"
        onChangeText={text => setJobLocation(text)}
        value={jobLocation}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Salary Range"
        onChangeText={text => setSalaryRange(text)}
        value={salaryRange}
        autoCapitalize='none'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={postJob}
      >
        <Text style={styles.buttonText}>Post Job</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
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
