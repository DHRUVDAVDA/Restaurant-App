import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Splashscreen";
import Login from "./Login";
import Firstscreen from "./Firstscreen"
import Signup from "./Signup";
import Homescreen from "./Homescreen";
import Createnewpswd from "./Createnewpswd";
import Upload from "../data upload/Upload";
import Fooddetail from "./Fooddetail";
import Profile from "./Profile";
import Orders from "./Orders";
import Categorywise from "./Categorywise";
import Bottomtab from "./Bottomnavigator";
import Restaurants from "./Restaurants";
import Restaurantdetail from "./Restaurantdetail";

const Stacknav = () => {

  const Stack = createNativeStackNavigator();

  return (


    <Stack.Navigator>

      <Stack.Screen name="Splashscreen" component={Splash} options={{ headerShown: false }} />

      <Stack.Screen name="Firstscreen" component={Firstscreen} options={{ headerShown: false }} />

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

      <Stack.Screen name="Signup" component={Signup} />

      <Stack.Screen name="Toptab" component={Bottomtab} 
      options={{headerShown:false}}
         />

      <Stack.Screen name="Homescreen" component={Homescreen}
        />

      <Stack.Screen name="Createnewpswd" component={Createnewpswd} />

      <Stack.Screen name="Upload" component={Upload} options={{
        title: 'Upload data',
        headerStyle: { backgroundColor: '#100f1f' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerTitleAlign: 'center'
      }} />

      <Stack.Screen name="Fooddetail" component={Fooddetail}
        options={{
          title: 'Select quantity',
          headerStyle: { backgroundColor: '#100f1f' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerTitleAlign: 'center'
        }} />

      <Stack.Screen name="profile" component={Profile} options={{headerShown: false }} />

      <Stack.Screen name="Orders" component={Orders}
        options={{
          title: 'All Orders',
          headerStyle: { backgroundColor: '#100f1f' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }} />


      <Stack.Screen name="Categorywisefood" component={Categorywise}
       options={{ headerShown: false }} />

      <Stack.Screen name="Restaurants" component={Restaurants} 
      options={{title:'res'}} />

      <Stack.Screen name="Restaurantdetail" component={Restaurantdetail} options={{headerShown:false}}/>
    </Stack.Navigator>

  )
}
export default Stacknav;
