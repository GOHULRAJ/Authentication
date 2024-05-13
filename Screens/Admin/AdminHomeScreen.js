import React, { useState } from 'react';
import{View,Text,TouchableOpacity,TextInput,StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';


 export default function AdminHomeScreen() {
    const navigation=useNavigation()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  
    return(
    <View>
        <Text>AdminHomeScreen</Text>
    </View>
)
 }