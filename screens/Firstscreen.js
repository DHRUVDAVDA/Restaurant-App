import React from "react";
import { View, Image, StyleSheet, Text, Button, TouchableOpacity, Dimensions, StatusBar } from "react-native"
import Login from "./Login";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function App({ navigation }) {
   return (
      <View style={Styles.container} >
         <StatusBar backgroundColor="#100f1f" />
         
         <TouchableOpacity onPress={() => navigation.navigate('Toptab')}>
            <Text style={{ fontSize: 20, color: 'white', alignSelf: 'flex-end', margin: 20 }}>SKIP</Text>
         </TouchableOpacity>

         <Image style={Styles.img} source={require('../Images/cutlery.png')} />

         <Text style={Styles.heading}>FOOD BANK</Text>
         <Text style={Styles.headingline}>Special & Delicious Food</Text>

         <TouchableOpacity onPress={() => navigation.navigate('Login')} style={Styles.btn1}>
            <Text style={Styles.btntext1}>Log in</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={Styles.btn2}>
            <Text style={Styles.btntext2}>Sign up</Text>
         </TouchableOpacity>

         <Image style={Styles.foodimg} source={require('../Images/food.jpg')} />
      </View>
   )
}
export default App;
const Styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#100f1f'
   },
   img: {
      height: 100,
      width: 100,
      alignSelf: 'center',
      marginTop: 60,
   },
   heading: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center'
   },
   headingline: {
      alignSelf: 'center',
      color: 'lightgrey',
      fontSize: 16
   },
   btn1: {
      width: '45%',
      height: '7%',
      backgroundColor: '#fd9827',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: 50
   },
   btn2: {
      width: '45%',
      height: '7%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: 50
   },
   btntext1: {
      color: "white",
      fontSize: 20,
   },
   btntext2: {
      color: "black",
      fontSize: 20,
   },
   foodimg: {
      height: '20%',
      width: windowWidth - 20,
      borderRadius: 50,
      position: 'absolute',
      bottom: 30,
      alignSelf: 'center'

   }
})