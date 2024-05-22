import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { firebase } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EmployerHomeScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


//   useEffect(() => {
//     // const fetchUserData = async () => {
//     //   try {
//     //     // const userRef = firebase.firestore().collection('employer');
//     //     // const doc = await userRef.get();
//     //     if (doc.exists) {
//     //       const userData = doc.data();
//     //       setFirstName(userData.firstName); // Assuming 'firstName' is a field in your Firestore document
//     //     } else {
//     //       Alert.alert('Error', 'User data not found.');
//     //     }
//     //   } catch (error) {
//     //     console.error('Error fetching user data:', error);
//     //     Alert.alert('Error', 'Failed to fetch user data. Please try again later.');
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     // fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#026efd" />
//       </View>
//     );
//   }

// useEffect(() => {
//   // Assume user data is stored in some state or context
//   // If no user is logged in, navigate to the Login screen
//   if (!user) {
//     navigation.navigate('Login');
//   }
// }, [user]);

// const logoutUser = () => {
//   setUser(null);
//   navigation.navigate('Login');
// };



  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={logoutUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {/* Hello, {firstName} */} Employer HomeScreen
      </Text>
      <TouchableOpacity>
        <Text onPress={()=>navigation.navigate('postJob')}>post job</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
