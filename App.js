import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState,useEffect } from "react";
import { firebase } from "./config";
import 'react-native-gesture-handler';


//user defined components
import Header from "./components/Header";

import MainScreen from "./Screens/MainScreen";

import JobSeekerLogin from "./Screens/JobSeeker/JobSeekerLogin";
import JobSeekerRegistration from "./Screens/JobSeeker/JobSeekerRegistration";
import JobSeekerHomeScreen from "./Screens/JobSeeker/JobSeekerHomeScreen";

import EmployerLogin from "./Screens/Employer/EmployerLogin";
import EmployerRegistration from "./Screens/Employer/EmployerRegistration";
import EmployerHomeScreen from "./Screens/Employer/EmployerHomeScreen";
import PostJob from "./Screens/Employer/postJob";


import AdminLogin from "./Screens/Admin/AdminLogin";
import AdminHomeScreen from "./Screens/Admin/AdminHomeScreen";
import ActiveJobsScreen from "./Screens/Admin/ActiveJobsScreen";
import JobSeekerListScreen from "./Screens/Admin/JobSeekerListScreen";
import EmployerListScreen from "./Screens/Admin/EmployerListScreen";
import JobProfileScreen from "./Screens/JobSeeker/JobProfileScreen";


const Stack=createStackNavigator();

function App(){
  const [initializing, setInitializing]=useState(true);
  const[user,setUser]=useState()

  //Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
  },[]);

  if(initializing) return null;

  if(!user){
    return(
      <Stack.Navigator screenOptions={{headerShown:false}} > 

        <Stack.Screen 
        name="MainScreen" 
        component={MainScreen}
        options={{
          headerTitle:()=> <Header name="Common Job Portals"/>,
          headerStyle:{
            height:100,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        <Stack.Screen 
        name="Login" 
        component={JobSeekerLogin}
        options={{
          headerTitle:()=> <Header name="Common Job Portals"/>,
          headerStyle:{
            height:100,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
          
        }}
        />

        <Stack.Screen 
        name="Registration" 
        component={JobSeekerRegistration}
        options={{
          headerTitle:()=> <Header name="Common Job Portals"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        <Stack.Screen 
        name="JobProfile" 
        component={JobProfileScreen}
        
        options={{
          headerTitle:()=> <Header name="JobProfileScreen"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        
    
        />

        {/* //employer Screen start */}
        <Stack.Screen 
        name="EmpLogin" 
        component={EmployerLogin}
        options={{
          headerTitle:()=> <Header name="EmployerLogin"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        <Stack.Screen 
        name="EmpReg" 
        component={EmployerRegistration}
        options={{
          headerTitle:()=> <Header name="EmployerRegister"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

      <Stack.Screen 
        name="EmpHome" 
        component={EmployerHomeScreen}
        options={{
          headerTitle:()=> <Header name="Employer Home"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        <Stack.Screen 
        name="postJob" 
        component={PostJob}
        options={{
          headerTitle:()=> <Header name="post job"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        {/* AdminScreens */}
        <Stack.Screen 
        name="AdminLogin" 
        component={AdminLogin}
        options={{
          headerTitle:()=> <Header name="Admin Login"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        <Stack.Screen 
        name="AdminHome" 
        component={AdminHomeScreen}
        options={{
          headerTitle:()=> <Header name="Admin Home"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

      <Stack.Screen 
        name="ActiveJobsScreen" 
        component={ActiveJobsScreen}
        options={{
          headerTitle:()=> <Header name="Admin Home"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

      <Stack.Screen 
        name="JobSeekerListScreen" 
        component={JobSeekerListScreen}
        options={{
          headerTitle:()=> <Header name="Admin Home"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />

        <Stack.Screen 
        name="EmployerListScreen" 
        component={EmployerListScreen}
        options={{
          headerTitle:()=> <Header name="Admin Home"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />



      </Stack.Navigator>
    )
  }

  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={JobSeekerHomeScreen}
        options={{
          headerTitle:()=> <Header name="JobSeekerHomeScreen"/>,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
          }
        }}
        />
    </Stack.Navigator>
  )
}

export default ()=>{
  return (
    <NavigationContainer>
      <App/> 
    </NavigationContainer>
  )
}