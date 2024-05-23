// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
// import { auth, db, storage } from '../../config';
// import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
// import DocumentPicker from 'react-native-document-picker';


// const JobSeekerProfileManagement=()=>{
//     return(
//         <Text>JobSeekerProfileManagement</Text>
//     )
// }
// // const JobSeekerProfileManagement = () => {
// //   const [userData, setUserData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     phoneNumber: '',
// //     resumeURL: '',
// //     profilePictureURL: '',
// //     skills: '',
// //     education: '',
// //     experience: ''
// //   });
// //   const [resumeFile, setResumeFile] = useState(null);
// //   const userId = auth.currentUser?.uid; // Ensure user is logged in and authenticated

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (userId) {
// //         const userDoc = await getDoc(doc(collection(db, 'jobSeeker'), userId));
// //         if (userDoc.exists()) {
// //           setUserData(userDoc.data());
// //         }
// //       }
// //     };
// //     fetchData();
// //   }, [userId]);

// //   const handleChange = (name, value) => {
// //     setUserData({ ...userData, [name]: value });
// //   };

// //   const handleFileChange = async () => {
// //     try {
// //       const res = await DocumentPicker.pick({
// //         type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx]
// //       });
// //       setResumeFile(res[0]);
// //     } catch (err) {
// //       if (DocumentPicker.isCancel(err)) {
// //         console.log('User cancelled the document picker');
// //       } else {
// //         throw err;
// //       }
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       let resumeURL = userData.resumeURL;
// //       if (resumeFile) {
// //         if (resumeURL) {
// //           const oldResumeRef = ref(storage, resumeURL);
// //           await deleteObject(oldResumeRef);
// //         }
// //         const newResumeRef = ref(storage, `resumes/${userId}/${resumeFile.name}`);
// //         const uploadTask = uploadBytesResumable(newResumeRef, resumeFile);
// //         await uploadTask;
// //         resumeURL = await getDownloadURL(newResumeRef);
// //       }

// //       await setDoc(doc(collection(db, 'jobSeeker'), userId), {
// //         ...userData,
// //         resumeURL,
// //         skills: userData.skills.split(',').map(skill => skill.trim()),
// //         updatedAt: serverTimestamp()
// //       });

// //       Alert.alert('Profile updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating profile: ', error);
// //       Alert.alert('Error updating profile');
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Manage Profile</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="First Name"
// //         value={userData.firstName}
// //         onChangeText={(value) => handleChange('firstName', value)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Last Name"
// //         value={userData.lastName}
// //         onChangeText={(value) => handleChange('lastName', value)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Email"
// //         value={userData.email}
// //         onChangeText={(value) => handleChange('email', value)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Phone Number"
// //         value={userData.phoneNumber}
// //         onChangeText={(value) => handleChange('phoneNumber', value)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Education"
// //         value={userData.education}
// //         onChangeText={(value) => handleChange('education', value)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Experience"
// //         value={userData.experience}
// //         onChangeText={(value) => handleChange('experience', value)}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Skills (comma separated)"
// //         value={userData.skills}
// //         onChangeText={(value) => handleChange('skills', value)}
// //       />
// //       <TouchableOpacity style={styles.button} onPress={handleFileChange}>
// //         <Text style={styles.buttonText}>Choose Resume</Text>
// //       </TouchableOpacity>
// //       {userData.resumeURL && (
// //         <Text style={styles.link}>
// //           Current Resume: <Text onPress={() => Linking.openURL(userData.resumeURL)}>View Resume</Text>
// //         </Text>
// //       )}
// //       <Button title="Save Changes" onPress={handleSubmit} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#fff',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 16,
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     marginBottom: 12,
// //     paddingHorizontal: 8,
// //   },
// //   button: {
// //     backgroundColor: '#007bff',
// //     padding: 10,
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //   },
// //   link: {
// //     color: 'blue',
// //     marginBottom: 12,
// //   },
// // });

// export default JobSeekerProfileManagement;
