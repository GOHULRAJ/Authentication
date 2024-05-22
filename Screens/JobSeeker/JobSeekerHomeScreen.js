import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

export default function JobSeekerHomeScreen() {
  const [jobs, setJobs] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeJobs = firebase.firestore().collection('jobs').onSnapshot(snapshot => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
    });

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const unsubscribeUser = firebase.firestore().collection('jobSeeker')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            setUserDetails(doc.data());
          }
        });
      
      return () => {
        unsubscribeJobs();
        unsubscribeUser();
      };
    } else {
      navigation.navigate('Login'); // Navigate to Login if user not logged in
    }
  }, []);

  const handleJobPress = (job) => {
    //navigation.navigate('JobProfile', { job }); // Navigate to JobProfileScreen with job object
    Alert.alert(
      `Job Title: ${job.jobTitle}`,
      // `Posted: ${job.createdAt}\n\n`
      `Job Description: ${job.jobDescription}\n\nRequired Skills: ${job.requiredSkills}\n\nJob Location: ${job.jobLocation}\n\nSalary Range: ${job.requiredSkills}`,
    );
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleJobPress(item)}>
      <Text>{item.jobTitle}</Text>
      <Text>{item.jobLocation}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {userDetails ? userDetails.firstName : ''}</Text>
        <Text style={styles.headerText}>Job Seeker ID: {userDetails ? userDetails.jobSeeker_id : ''}</Text>
          <View>

          </View>
        <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalJobsText}>Total Jobs Available: {jobs.length}</Text>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#026efd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalJobsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
});
