import React, { useState } from 'react';
import {View,Text,TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import { firebase } from '../../config';

export default function Registration() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')

  registerUSer= async(email,password,firstName,lastName)=>{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp:true,
        url:'https://job-portal-b8e90.firebaseapp.com',
      })
      .then(()=>{
        alert('verification Email sent')
      })
      .catch((error)=>{
        alert(error.message)
      })
      .then(()=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
         
        })
      })
      .catch((error)=>{
        alert(error.message)
      })
    })
    .catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:23}}>Register Here !!</Text>
      <View style={{marginTop:40}}>
      <TextInput 
            style={styles.textInput}
            placeholder='First Name'
            onChangeText={(firstName)=>{
            setFirstName(firstName)
          }}
          autoCorrect={false}
          />
          <TextInput 
            style={styles.textInput}
            placeholder='Last Name'
            onChangeText={(lastName)=>{setLastName(lastName)}}
            autoCorrect={false}
          />
           <TextInput 
            style={styles.textInput}
            placeholder='Email'
            onChangeText={(email)=>{setEmail(email)}}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
          />
           <TextInput 
              style={styles.textInput}
              placeholder='password'
              onChangeText={(password)=>{setPassword(password)}}
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry={true}
          />
      </View>
      <TouchableOpacity
        onPress={()=>registerUSer(email,password,firstName,lastName)}
        style={styles.button}
      >
        
        <Text style={{fontWeight:'bold',fontSize:22}}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles=StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
      marginTop:100,
  },
  textInput:{
      paddingTop:20,
      paddingBottom:0,
      width:400,
      fontSize:20,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      marginBottom:10,
      textAlign:'center'

  },
  button:{
      marginTop:50,
      height:70,
      width:250,
      backgroundColor:'#026efd',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:50,

  }
  
})