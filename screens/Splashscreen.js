import React,{useState , useEffect} from "react";
import { Image, StyleSheet, View ,Dimensions, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 function Splash({navigation}){

  useEffect(()=>{
   setTimeout(()=>{
    AsyncStorage.getItem('user').then((response) =>
          { 
            console.log(response);
            if(response === null){
              navigation.navigate('Firstscreen')
            }
           else if(response.includes('true')){
            navigation.navigate('Homescreen')
          }
          else {
            navigation.navigate('Firstscreen')
          }
          });
   },3000) 
  })

    return(console.log('splash'),
        <View style={Style.container}>
            <Image style={Style.Image} source={require('../Images/deliveryboy.png')}/>
        </View>
    )
}
export default Splash;
const Style = StyleSheet.create({
 container:{
    height:windowHeight
 },
 Image:{
    height:windowHeight,
    width:windowWidth,
 }
})