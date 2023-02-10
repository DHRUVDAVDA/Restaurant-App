import React from "react";
import {} from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Homescreen from "./Homescreen";

const Drawernavigator = ({navigation}) =>{

    const Drawer = createDrawerNavigator();

 
    <Drawer.Navigator>
        <Drawer.Screen name="Homepage" component={Homescreen} options={{headerShown: true}}/>
    </Drawer.Navigator>
 

}
export default Drawernavigator;