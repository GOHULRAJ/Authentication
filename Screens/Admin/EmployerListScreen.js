import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';

export default function EmployerListScreen({navigation}) {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [totalJobSeekers, setTotalJobSeekers] = useState(0);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('employers').onSnapshot(snapshot => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobSeekers(usersData);
      setTotalJobSeekers(usersData.length);
    });
    return () => unsubscribe();
  }, []);

  const renderJobSeekerItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text>Employer Id: {item.id}</Text>
      <Text>Employer Name: {item.firstName} {item.lastName}</Text>
      <Text>Employer Email: {item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Total Employers: {totalJobSeekers}</Text>
      <FlatList
        data={jobSeekers}
        renderItem={renderJobSeekerItem}
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
  headerText: {
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
