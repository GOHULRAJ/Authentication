import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState,useEffect } from "react";
import { firebase } from "./config";


//user defined components
import Header from "./components/Header";
import JobSeekerLogin from "./Screens/JobSeeker/JobSeekerLogin";
import JobSeekerRegistration from "./Screens/JobSeeker/JobSeekerRegistration";
import JobSeekerHomeScreen from "./Screens/JobSeeker/JobSeekerHomeScreen";

import EmployerLogin from "./Screens/Employer/EmployerLogin";
import EmployerRegistration from "./Screens/Employer/EmployerRegistration";
import EmployerHomeScreen from "./Screens/Employer/EmployerHomeScreen";
import MainScreen from "./Screens/MainScreen";

import AdminLogin from "./Screens/Admin/AdminLogin";
import AdminHomeScreen from "./Screens/Admin/AdminHomeScreen";

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
      <Stack.Navigator>

        <Stack.Screen 
        name="MainScreen" 
        component={MainScreen}
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
        name="Login" 
        component={JobSeekerLogin}
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