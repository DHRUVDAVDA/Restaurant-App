import React,{useState , useEffect} from "react";
import { Image, StyleSheet, View ,Dimensions, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 function Splash({navigation}){

  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    
  setTimeout(()=>{
    isSignedup();
  },3000)
  })

  function Auth(){
    if(authLoaded){
      navigation.navigate('Homescreen')
     } 
     else{
      navigation.navigate('Firstscreen')
     }
  }

  function isSignedup() {
        try {
          AsyncStorage.getItem('user').then((response) =>
          { 
            console.log(response);
            if(response.includes('true')){
            setAuthLoaded(true);
            Auth();
          }
          });
        }
        catch (error) {
          console.log(error);
        }
        
      }
     

      

    return(console.log('splash'),
        <View style={Style.container}>
            <Image style={Style.Image} source={require('./deliveryboy.png')}/>
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