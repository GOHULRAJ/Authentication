import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState,useEffect } from "react";
import { firebase } from "./config";


//user defined components
import Header from "./components/Header";
import Login from "./Screens/Login";
import Registration from "./Screens/Registration";
import Dashboard from "./Screens/Dashboard";

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
        name="Login" 
        component={Login}
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
        name="Register" 
        component={Registration}
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
      </Stack.Navigator>
    )
  }

  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          headerTitle:()=> <Header name="Dashboard"/>,
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