import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Splashscreen";
import Login from "./Login";
import Firstscreen from "./Firstscreen"
import Signup from "./Signup";
import Homescreen from "./Homescreen";
import Createnewpswd from"./Createnewpswd";
import Upload from "../data upload/Upload";
import Fooddetail from "./Fooddetail";
import Profile from "./Profile";
import Orders from "./Orders";
import Bill from "./Billing";

const Stacknav = () => {
    
  const Stack = createNativeStackNavigator();
  
    return (
   
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={Splash} />
        <Stack.Screen name="Firstscreen" component={Firstscreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="Createnewpswd" component={Createnewpswd} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Fooddetail" component={Fooddetail} />
        <Stack.Screen name="profile" component={Profile}/>
        <Stack.Screen name="Orders" component={Orders}/>
        <Stack.Screen name="Bill" component={Bill}/>
      </Stack.Navigator>
    
  )
  }
export default Stacknav;
