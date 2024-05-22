import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';

export default function ActiveJobsScreen() {
  const [jobList, setJobList] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('jobs')
      .onSnapshot(snapshot => {
        const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobList(jobsData);
        setTotalJobs(jobsData.length);
      });

    return () => unsubscribe();
  }, []);

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard}>
      <Text>{item.jobTitle}</Text>
      <Text>Location: {item.jobLocation}</Text>
      <Text>Required Skills: {item.requiredSkills}</Text>
      <Text>Job Description: {item.jobDescription}</Text>
      <Text>Job ID: {item.jobID}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Jobs: {totalJobs}</Text>
      <FlatList
        data={jobList}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  jobCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
