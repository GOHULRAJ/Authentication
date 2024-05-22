import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';

export default function JobSeekerListScreen() {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [totalJobSeekers, setTotalJobSeekers] = useState(0);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('jobSeeker')
      .onSnapshot(snapshot => {
        const jobSeekerData = [];
        snapshot.forEach(doc => {
          jobSeekerData.push({
            id: doc.data().jobSeeker_id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
          });
        });
        setJobSeekers(jobSeekerData);
        setTotalJobSeekers(jobSeekerData.length);
      });

    return () => unsubscribe();
  }, []);

  const renderJobSeekerItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text>JobSeeker_id: {item.id}</Text>
      <Text>Name: {item.firstName} {item.lastName}</Text>
      <Text>E-Mail: {item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Job Seekers: {totalJobSeekers}</Text>
      <FlatList
        data={jobSeekers}
        renderItem={renderJobSeekerItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
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
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
