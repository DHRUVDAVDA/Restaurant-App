import React,{useState} from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { useEffect } from "react";
import Signup from "./screens/Signup"
import Firstscreen from "./screens/Firstscreen"
import Homescreen from "./screens/Homescreen";
import Createnewpswd from "./screens/Createnewpswd";
import Upload from "./data upload/Upload";
import Fooddetail from "./screens/Fooddetail";
import Splash from "./screens/Splashscreen";


const App = () => {
    
  const Stack = createNativeStackNavigator();
  
    return (
    <NavigationContainer>
      
      <Stack.Navigator  initialRouteName='Splashscreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={Splash} />
        <Stack.Screen name="Firstscreen" component={Firstscreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="Createnewpswd" component={Createnewpswd} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Fooddetail" component={Fooddetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  }
export default App;
