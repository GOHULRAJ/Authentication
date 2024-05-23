// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet,ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { firebase } from '../../config';
// import "@react-navigation/stack";


// export default function JobSeekerHomeScreen() {
//   const [jobs, setJobs] = useState([]);
//   const [userDetails, setUserDetails] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribeJobs = firebase.firestore().collection('jobs').onSnapshot(snapshot => {
//       const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setJobs(jobsData);
//       console.log(currentUser.uid)
//     });

//     const currentUser = firebase.auth().currentUser;
//     if (currentUser) {
//       const unsubscribeUser = firebase.firestore().collection('jobSeeker')
//         .doc(currentUser.uid)
//         .onSnapshot(doc => {
//           if (doc.exists) {
//             setUserDetails(doc.data());
//           }
//         });
      
//       return () => {
//         unsubscribeJobs();
//         unsubscribeUser();
//       };
//     } else {
//       navigation.navigate('Login'); // Navigate to Login if user not logged in
//     }
//   }, []);

//   const ApplyJob = () => {
//     console.log('job Applied')
//   };

//   const handleJobPress = (job) => {
//     console.log(job)
    
//   //  Navigate to JobProfileScreen with job object
//     Alert.alert(
//     `Title: ${job.jobTitle}`,
//     `Job Description: ${job.jobDescription}\n\n
//     Job Location: ${job.jobLocation}\n\n
//     Required Skills: ${job.requiredSkills}\n\n
//     `,
//     [  
//       {  
//           text: 'Cancel',  
//           onPress: () => console.log('Cancel Pressed'),  
//           style: 'cancel',  
//       },  
//       {text: 'Apply', onPress: () =>{ApplyJob()}},  
//   ]  
//   );
    
//   };

//   const renderJobItem = ({ item }) => (
//     <TouchableOpacity style={styles.card} onPress={() => handleJobPress(item)}>
//       <Text>{item.jobTitle}</Text>
//       <Text>{item.jobLocation}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>User: {userDetails ? userDetails.firstName: ''}</Text>
//         {/* <Text style={styles.headerText}>ID: {userDetails ? userDetails.jobSeeker_id : ''}</Text> */}
//           <View>

//           </View>
//         <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.logoutButton}>
//           <Text style={styles.logoutButtonText}>Sign Out</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.totalJobsText}>Total Jobs Available: {jobs.length}</Text>
//       <FlatList
//         data={jobs}
//         renderItem={renderJobItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   logoutButton: {
//     backgroundColor: '#026efd',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   totalJobsText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
// });




import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

export default function JobSeekerHomeScreen() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeJobs = firebase.firestore().collection('jobs').onSnapshot(snapshot => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
      setFilteredJobs(jobsData); // Initialize filteredJobs with all jobs
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
  }, [navigation]);

  const applyJob = async (job) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const appliedJobData = {
          AppliedJobID: generateID(),
          JobSeeker_id: currentUser.uid,
          JobID: job.id,
          AppliedAt: firebase.firestore.Timestamp.now(),
        };

        await firebase.firestore().collection('AppliedJobs').add(appliedJobData);
        Alert.alert('Success', 'You have successfully applied for the job.');
      } else {
        Alert.alert('Error', 'You must be logged in to apply for a job.');
      }
    } catch (error) {
      console.error('Error applying for job:', error.message);
      Alert.alert('Error', 'An error occurred while applying for the job.');
    }
  };

  const handleJobPress = (job) => {
    Alert.alert(
      `Title: ${job.jobTitle}`,
        `Job Description: ${job.jobDescription}\n\n
         Job Location: ${job.jobLocation}\n\n
         Required Skills: ${job.requiredSkills}\n\n
         `,    [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Apply', onPress: () => applyJob(job) },
      ],
    );
  };

  const generateID = () => {
    return new Date().getTime().toString();
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleJobPress(item)}>
      <Text>{item.jobTitle}</Text>
      <Text>{item.jobLocation}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = jobs.filter(job => {
      const skills = Array.isArray(job.requiredSkills) ? job.requiredSkills : [];
      return job.jobTitle.toLowerCase().includes(text.toLowerCase()) ||
        job.jobLocation.toLowerCase().includes(text.toLowerCase()) ||
        skills.some(skill => skill.toLowerCase().includes(text.toLowerCase()));
    });
    setFilteredJobs(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User: {userDetails ? userDetails.firstName : 'Loading...'}</Text>
        <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search jobs by title, location or skills"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Text style={styles.totalJobsText}>Total Jobs Available: {filteredJobs.length}</Text>
      <FlatList
        data={filteredJobs}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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
